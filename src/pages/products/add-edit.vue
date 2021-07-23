<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <router-link class="g-button g-button--danger" to="/products">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box :double="true" class="mb-20">
      <template v-slot:outer-content>
        <page-header class="mb-20">
          <template v-slot:content>
            <h2 class="g-title">General Product Info</h2>
          </template>
          <button
            class="g-button"
            :class="{ 'g-button--blinking': dataUpdatedGeneral }"
            @click="onProductSave"
            :disabled="waitGeneral"
          >
            <font-awesome-icon icon="save" />
            <span>Save</span>
          </button>
        </page-header>
      </template>
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
          label="Slug"
          v-if="activeLang === 'ru'"
        />
        <custom-input
          v-model="slugAz"
          @input="onSlugInput"
          placeholder="Enter slug (based on the name by default)"
          class="mb-20"
          label="Slug"
          v-else-if="activeLang === 'az'"
        />
        <custom-cascader
          :value="category"
          @set-value="onCategorySelect"
          :options="cascaderCategories"
          label="Category (all languages)"
          placeholder="Select category (or leave it empty)"
          class="mb-20"
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
          label="Brand (all languages)"
          placeholder="Select brand"
        />
      </div>
    </page-box>
    <page-box class="mb-20" title="Colors and Images" side-title="(all languages)">
      <div class="g-flex-wrap">
        <template v-for="(color, i) in colorsValues">
          <custom-select
            v-if="!color && filteredColors.length"
            :key="i"
            :value="color ? color.id : null"
            @input="onColorAdd"
            :options="filteredColors"
            :round="true"
          />
          <div
            v-else-if="color"
            :key="i"
            @click="currentColorId = color.id"
            class="g-color-wrapper g-color-wrapper--clickable"
            :class="{
              'g-color-wrapper--not-saved': color ? !color.saved : false,
              'g-color-wrapper--active': color.id === currentColorId
            }"
          >
            <div
              class="g-color"
              :style="{ background: `#${color.hex}` }"
            />
          </div>
        </template>
      </div>
      <div class="mt-20" v-if="currentColor">
        <page-header class="mb-20 w-100">
          <template v-slot:content>
            <h2 class="g-subtitle mb-0">Color {{ currentColor.name }} #{{ currentColor.hex }} ({{ currentColor.id }})</h2>
          </template>
          <button class="g-button" :class="{ 'g-button--blinking': !currentColor.saved }" @click="onColorSave" :disabled="waitColor">
            <font-awesome-icon icon="save" />
            <span>Save</span>
          </button>
          <button class="g-button g-button--danger" @click="onColorRemove">
            <font-awesome-icon icon="trash" />
            <span>Remove</span>
          </button>
        </page-header>
        <div class="g-flex-wrap w-100 m--10">
          <template v-for="(image, i) in currentColorImages">
            <drop-image
              class="add-edit-page__drop-image--md-triple"
              :key="i"
              @set="onImageSet($event, i)"
              :img-src="image ? image.src : null"
              placeholder="Add image"
              :label="`Image #${i+1}`"
            />
          </template>
        </div>
      </div>
    </page-box>

    <meta-form
      @submit="onMetaSubmit"
      @set-updated="metaDataUpdated = $event"
      :data-updated="metaDataUpdated"
      :initial-data="meta"
      :loading="metaLoading"
      :url="`https://proximart.az/product/${activeLang === 'ru' ? slug : activeLang === 'az' ? slugAz : ''}`"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DropImage from '@/components/DropImage'
const slugify = require('slugify')

export default {
  name: 'ProductsAddEdit',

  components: {
    DropImage,
    // DropImage: () => import('@/components/DropImage'),
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomCascader: () => import('@/components/CustomCascader'),
    CustomSelect: () => import('@/components/CustomSelect'),
    MetaForm: () => import('@/containers/MetaForm')
  },

  data () {
    return {
      name: '',
      nameAz: '',
      description: '',
      descriptionAz: '',
      slug: '',
      slugAz: '',
      price: '',
      stock: '',
      discount: '',
      category: null,
      brand: null,

      colors: {},

      currentColorId: null,

      image: null,
      alt: '',
      imageFile: null,

      meta: null,
      metaLoading: false,

      nameError: '',
      nameAzError: '',
      descriptionError: '',
      descriptionAzError: '',
      slugError: '',
      imageError: '',
      altError: '',

      slugBasedOnName: true,
      slugBasedOnNameAz: true,

      waitGeneral: false,
      waitColor: false,
      loading: false,
      dataUpdatedGeneral: false,
      metaDataUpdated: false,
      dontSendData: false
    }
  },

  async created () {
    await this.fetchCascaderCategories()
    await this.fetchAllBrands()
    await this.fetchAllColors()
  },

  async mounted () {
    if (this.productId) {
      this.loading = true
      await this.fetchProduct(this.productId)
        .then(({ data }) => {
          this.name = data.name ?? ''
          this.nameAz = data.name__az ?? ''
          this.description = data.description ?? ''
          this.descriptionAz = data.description__az ?? ''
          this.slug = data.slug ?? ''
          this.slugAz = data.slug__az ?? ''
          this.price = data.price
          this.stock = data.stock
          this.discount = data.discount
          this.category = data.category?.id ?? null
          this.brand = data.brand
          this.meta = data.meta
          if (data.colors) {
            const colors = {}
            data.colors.forEach(c => {
              const images = c.images.map(i => ({
                src: i.url
              }))
              images.push(null)
              colors[c.color.id] = {
                ...c.color,
                relationId: c.id,
                saved: true,
                new: false,
                images: images
              }
            })
            this.$set(this, 'colors', colors)
            this.currentColorId = this.colorsValues.find(cv => cv !== null)?.id ?? null
          }

          this.slugBasedOnName = !this.slug
          this.slugBasedOnNameAz = !this.slugAz
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/products')
        })
      // TODO fetch parameters
      this.loading = false
    }

    this.$watch(vm => [
      vm.name,
      vm.nameAz,
      vm.description,
      vm.descriptionAz,
      vm.slug,
      vm.slugAz,
      vm.price,
      vm.stock,
      vm.discount,
      vm.category,
      vm.brand
    ], () => {
      this.dataUpdateGeneral()
    })

    this.$watch(vm => [
      vm.dataUpdatedGeneral
    ], () => {
      this.checkDataUpdated()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('categories', ['cascaderCategories']),
    ...mapState('products', ['allBrands', 'allColors']),

    colorsValues () {
      const newColors = Object.values(this.colors)
      newColors.push(null)
      return newColors
    },

    filteredColors () {
      return (
        this.allColors
          ? this.allColors.filter(c => !this.colors[c.id.toString()])
          : []
      )
    },

    currentColor () {
      if (this.currentColorId?.toString() && this.colors[this.currentColorId.toString()]) {
        return this.colors[this.currentColorId.toString()]
      }
      return null
    },

    currentColorImages () {
      return this.currentColor?.images ?? null
    },

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
    ...mapActions('products', ['updateProduct', 'fetchProduct', 'fetchAllBrands', 'fetchAllColors', 'updateProductColor', 'createProductColor', 'deleteProductColor', 'saveMeta']),

    dataUpdateGeneral () {
      this.dataUpdatedGeneral = true
    },

    checkDataUpdated () {
      if (this.dataUpdatedGeneral ||
          this.colorsValues.some(data => data !== null && !data.saved)) {
        window.onbeforeunload = e => {
          e.preventDefault()
          e.returnValue = ''
        }
        return true
      } else {
        window.onbeforeunload = null
        return false
      }
    },

    onColorAdd (colorId) {
      const color = this.allColors.find(c => c.id === colorId)
      this.$set(this.colors, colorId.toString(), {
        ...color,
        saved: false,
        new: true,
        images: [null]
      })
      this.currentColorId = colorId
    },

    onImageSet (imageData, index) {
      const currentColor = this.currentColor

      currentColor.saved = false

      if (imageData.file === '') {
        if (index === currentColor.images.length - 1)
          currentColor.images[index] = null
        else currentColor.images.splice(index, 1)
      } else {
        currentColor.images[index] = imageData
      }

      const images = currentColor.images
      if (images[images.length - 1] !== null)
        images.push(null)

      this.$set(this.colors, currentColor.id.toString(), currentColor)
    },

    async onColorSave () {
      this.waitColor = true
      const colorData = {
        id: this.currentColor.relationId,
        product: parseInt(this.productId),
        color: this.currentColorId,
        files: this.currentColor.images.map(i => i?.file ?? i?.src ?? null).filter(i => i)
      }
      const currentColor = this.currentColor
      if (this.currentColor.new) {
        await this.createProductColor(colorData)
          .then(res => {
            this.$toasted.success('The product color was successfully created')
            currentColor.new = false
            currentColor.saved = true
            currentColor.relationId = res.data.id
            this.$set(this.colors, currentColor.id.toString(), currentColor)
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      } else {
        await this.updateProductColor(colorData)
          .then(() => {
            this.$toasted.success('The product color was successfully updated')
            currentColor.saved = true
            this.$set(this.colors, currentColor.id.toString(), currentColor)
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      }

      this.waitColor = false
    },

    async onColorRemove () {
      let error = false
      const colorIdToRemove = this.currentColorId.toString(),
        colors = Object.assign({}, this.colors)
      if (!this.currentColor.new)
        await this.deleteProductColor({ id: this.currentColor.relationId })
          .then(() => {
            this.$toasted.success(`The color with id ${colorIdToRemove} was removed`)
          })
          .catch(e => {
            error = true
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })

      if (!error) {
        delete colors[colorIdToRemove]
        this.$set(this, 'colors', colors)
        this.currentColorId = this.colorsValues[0]?.id ?? null
      }
    },

    onCategorySelect (category) {
      this.category = category
    },

    async onProductSave () {
      const productData = {
        name: this.name,
        name__az: this.nameAz,
        description: this.description,
        description__az: this.descriptionAz,
        slug: this.slug,
        slug__az: this.slugAz,
        price: parseFloat(this.price ? this.price : '0'),
        stock: parseInt(this.stock ? this.stock : '0'),
        discount: parseFloat(this.discount ? this.discount : '0'),
        brand: this.brand,
        id: parseInt(this.productId)
      }

      if (this.category)
        productData.category = this.category

      if (this.imageFile)
        productData.file = this.imageFile

      this.waitGeneral = true

      let isProductUpdated = true
      await this.updateProduct(productData)
        .catch(e => {
          isProductUpdated = 'no-product'
          console.error(e)
          this.$toasted.error(e.response.data.message)
        })

      if (isProductUpdated === true)
        this.$toasted.success('The product was successfully updated')

      this.dataUpdatedGeneral = false
      this.waitGeneral = false
    },

    async onMetaSubmit (rawData) {
      this.metaLoading = true
      await this.saveMeta({
        meta: { ...rawData, product: this.productId },
        metaId: this.meta?.id
      })
        .then(res => {
          this.meta = res?.data
          this.$toasted.success('Product\'s meta was successfully saved')
          this.metaDataUpdated = false
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
        })
      this.metaLoading = false
    },

    onNameInput () {
      this.slugError = ''
      if (this.activeLang === 'ru')
        this.nameError = ''
      else if (this.activeLang === 'az')
        this.nameAzError = ''

      if (this.slugBasedOnName) this.slug = slugify(this.name).toLowerCase()
      if (this.slugBasedOnNameAz) this.slugAz = slugify(this.nameAz).toLowerCase()
    },

    onDescriptionInput () {
      if (this.activeLang === 'ru')
        this.descriptionError = ''
      else if (this.activeLang === 'az')
        this.descriptionAzError = ''
    },

    onSlugInput () {
      this.slugError = ''
      this.slugBasedOnName = !this.slug
      this.slugBasedOnNameAz = !this.slugAz
      this.slug = slugify(this.slug).toLowerCase()
      this.slugAz = slugify(this.slugAz).toLowerCase()
    }
  },

  beforeRouteLeave (to, from, next) {
    if (!this.checkDataUpdated())
      next()
    else {
      if (confirm('Changes you made may not be saved.')) {
        window.onbeforeunload = null
        next()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/add-edit.scss';
</style>
