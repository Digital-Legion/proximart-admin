<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <button class="g-button" @click="submit(true)" :disabled="wait">
        <font-awesome-icon icon="save" />
        <span>Save</span>
        <span v-if="dataUpdated"> (autosave in {{ timeLeftToUpdate }})</span>
      </button>
      <router-link class="g-button" to="/products">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box :double="true">
      <div class="add-edit-page__left">
        <custom-input
          v-model="name"
          @input="onNameInput"
          placeholder="Enter name"
          class="mb-20"
          label="Name"
          v-if="activeLang === 'ru'"
        />
        <custom-input
          v-model="nameAz"
          @input="onNameInput"
          placeholder="Enter name"
          class="mb-20"
          label="Name"
          v-else-if="activeLang === 'az'"
        />
        <custom-input
          v-model="description"
          @input="onDescriptionInput"
          placeholder="Enter description"
          :is-textarea="true"
          class="mb-20"
          label="Description"
          v-if="activeLang === 'ru'"
        />
        <custom-input
          v-model="descriptionAz"
          @input="onDescriptionInput"
          placeholder="Enter description"
          :is-textarea="true"
          class="mb-20"
          label="Description"
          v-else-if="activeLang === 'az'"
        />
        <custom-input
          v-model="slug"
          @input="onSlugInput"
          placeholder="Enter slug (based on the name by default)"
          class="mb-20"
          label="Slug (all languages)"
        />
        <custom-cascader
          :value="category"
          @set-value="onCategorySelect"
          :options="cascaderCategories"
          label="Category (all languages)"
          placeholder="Select category (or leave it empty)"
        />
      </div>
      <div class="add-edit-page__right">
        <custom-input
          v-model="price"
          type="number"
          placeholder="Enter price"
          class="mb-20"
          label="Price (all languages)"
        />
        <custom-input
          v-model="stock"
          type="number"
          placeholder="Enter stock"
          class="mb-20"
          label="Stock (all languages)"
        />
        <custom-input
          v-model="discount"
          type="number"
          placeholder="Enter discount"
          class="mb-20"
          label="Discount (all languages)"
        />
        <custom-select
          :value="brand"
          @set-value="brand = $event"
          :options="allBrands"
          label="Brand"
          placeholder="Select brand"
        />
      </div>
    </page-box>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { debounce } from '@/utils/debounce'
const slugify = require('slugify')

export default {
  name: 'CategoriesAddEdit',

  components: {
    // DropImage: () => import('@/components/DropImage'),
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomCascader: () => import('@/components/CustomCascader'),
    CustomSelect: () => import('@/components/CustomSelect')
  },

  data () {
    return {
      name: '',
      nameAz: '',
      description: '',
      descriptionAz: '',
      slug: '',
      price: '',
      stock: '',
      discount: '',
      category: null,
      brand: null,

      image: null,
      alt: '',
      imageFile: null,

      nameError: '',
      nameAzError: '',
      descriptionError: '',
      descriptionAzError: '',
      slugError: '',
      imageError: '',
      altError: '',

      slugBasedOnName: true,

      wait: false,
      loading: false,
      dataUpdated: false,
      timer: null,
      timeLeftToUpdate: 0,
      dontSendData: false
    }
  },

  async created () {
    await this.fetchCascaderCategories()
    await this.fetchAllBrands()
  },

  async mounted () {
    if (this.productId) {
      this.loading = true
      await this.fetchProduct(this.productId)
        .then(({ data }) => {
          this.name = data.name
          this.nameAz = data.name__az
          this.description = data.description
          this.descriptionAz = data.description__az
          this.slug = data.slug
          this.price = data.price
          this.stock = data.stock
          this.discount = data.discount
          this.category = data.category?.id ?? null
          this.brand = data.brand

          this.slugBasedOnName = this.slug === ''
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/products')
        })
      this.loading = false
    }

    // watching variables
    this.$watch(vm => [
      vm.name,
      vm.nameAz,
      vm.description,
      vm.descriptionAz,
      vm.slug,
      vm.price,
      vm.stock,
      vm.discount,
      vm.alt,
      vm.imageFile,
      vm.category,
      vm.brand
    ], () => {
      if (this.productId)
        this.dataUpdate()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('categories', ['cascaderCategories']),
    ...mapState('products', ['allBrands']),

    pageTitle () {
      return this.productId ? `Editing product ${this.name ?? 'with id ' + this.productId}` : 'Something went wrong'
    },

    productId () {
      return this.$route.params.id
    },

    defaultLangError () {
      return (
        this.nameError &&
          this.descriptionError &&
          this.slugError &&
          this.altError &&
          this.imageError
      )
    },

    azLangError () {
      return (
        this.nameError &&
          this.descriptionError &&
          this.slugError &&
          this.altError &&
          this.imageError
      )
    },

    filteredLangs () {
      return this.langs.map(lang => ({
        ...lang,
        error: lang.title === 'ru' ? this.defaultLangError : (lang.title === 'az' ? this.azLangError : false)
      }))
    }
  },

  methods: {
    ...mapMutations(['setActiveLang']),
    ...mapActions('categories', ['fetchCascaderCategories']),
    ...mapActions('products', ['updateProduct', 'fetchProduct', 'fetchAllBrands']),

    dataUpdate () {
      this.dataUpdated = true
      this.startTimer()
      this.onDataUpdate()
    },

    onCategorySelect (category) {
      this.category = category
    },

    onDataUpdate: (debounce(function () {
      this.dataUpdated = false
      if (this.timer === null)
        this.submit()
    }, (10 + 1) * 1000)), // update data after N seconds after it's been changed with debounce

    startTimer () {
      clearInterval(this.timer)
      this.timeLeftToUpdate = 10
      this.timer = setInterval(() => {
        this.timeLeftToUpdate--
        if (this.timeLeftToUpdate <= 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },

    async submit () {
      const data = {
        name: this.name,
        name__az: this.nameAz,
        description: this.description,
        description__az: this.descriptionAz,
        slug: this.slug,
        price: parseFloat(this.price ? this.price : '0'),
        stock: parseInt(this.stock ? this.stock : '0'),
        discount: parseFloat(this.discount ? this.discount : '0'),
        brand: this.brand,
        id: parseInt(this.productId)
      }

      if (this.category)
        data.category = this.category

      if (this.imageFile)
        data.file = this.imageFile

      this.wait = true

      await this.updateProduct(data)
        .then(() => {
          this.$toasted.success('The product was successfully updated')
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
        })

      this.dataUpdated = false
      this.wait = false
      clearTimeout(this.timer)
    },

    onNameInput () {
      this.slugError = ''
      if (this.activeLang === 'ru')
        this.nameError = ''
      else if (this.activeLang === 'az')
        this.nameAzError = ''

      if (this.slugBasedOnName) this.slug = slugify(this.name).toLowerCase()
    },

    onDescriptionInput () {
      if (this.activeLang === 'ru')
        this.descriptionError = ''
      else if (this.activeLang === 'az')
        this.descriptionAzError = ''
    },

    onSlugInput () {
      this.slugError = ''
      this.slugBasedOnName = this.slug === ''
      this.slug = slugify(this.slug).toLowerCase()
    }
  },

  beforeRouteLeave (to, from, next) {
    this.dontSendData = true
    clearTimeout(this.timer)
    this.dataUpdated = false
    next()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/add-edit.scss';
</style>
