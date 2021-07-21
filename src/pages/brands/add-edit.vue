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
      <router-link class="g-button" to="/brands">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-box :double="true">
      <div class="add-edit-page__left">
        <custom-input
          v-model="name"
          @input="onNameInput"
          placeholder="Enter name"
          class="mb-20"
          label="Name"
        />
        <custom-input
          v-model="slug"
          @input="onSlugInput"
          placeholder="Enter slug (based on the name by default)"
          class="mb-20"
          label="Slug"
        />
        <custom-select
          :value="categories"
          :multiple="true"
          @set-value="onCategoriesSelect"
          :options="allCategories"
          label="Categories"
          placeholder="Select categories (or leave it empty)"
        />
      </div>
      <div class="add-edit-page__right">
        <DropImage
          label="Image"
          placeholder="Select image"
          :img-src="image"
          @set-image-src="image = $event"
          @set-image="imageFile = $event; image = ''"
          class="mb-20"
        />
        <custom-input
          v-model="alt"
          @input="altError = ''"
          placeholder="Enter image's alt"
          label="Alt"
        />
      </div>
    </page-box>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DropImage from '@/components/DropImage'
import { debounce } from '@/utils/debounce'
const slugify = require('slugify')

export default {
  name: 'BrandsAddEdit',

  components: {
    DropImage,
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomSelect: () => import('@/components/CustomSelect')
  },

  data () {
    return {
      name: '',
      alt: '',
      slug: '',
      categories: [],
      image: null,
      imageFile: null,

      slugBasedOnName: true,

      nameError: '',
      slugError: '',
      imageError: '',
      altError: '',

      wait: false,
      loading: false,
      dataUpdated: false,
      timer: null,
      timeLeftToUpdate: 0,
      dontSendData: false
    }
  },

  async created () {
    await this.fetchAllCategories()
  },

  async mounted () {
    if (this.brandId) {
      this.loading = true
      await this.fetchBrand(this.brandId)
        .then(({ data }) => {
          this.name = data.name
          this.alt = data.image?.alt ?? ''
          this.slug = data.slug
          this.image = data.image?.url ?? ''
          this.categories = data.categories

          this.slugBasedOnName = this.slug === ''
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/brands')
        })
      this.loading = false
    }

    // watching variables
    this.$watch(vm => [
      vm.name,
      vm.slug,
      vm.alt,
      vm.imageFile,
      vm.categories
    ], () => {
      if (this.brandId)
        this.dataUpdate()
    })
  },

  computed: {
    ...mapState('brands', ['allCategories']),

    pageTitle () {
      return this.brandId ? `Editing brand ${this.name ?? 'with id ' + this.brandId}` : 'Creating a new brand'
    },

    brandId () {
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions('brands', ['fetchAllCategories', 'fetchBrand', 'createBrand', 'updateBrand']),

    dataUpdate () {
      this.dataUpdated = true
      this.startTimer()
      this.onDataUpdate()
    },

    onCategoriesSelect (categories) {
      this.categories = categories
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

    async submit (redirect) {
      const data = {
        name: this.name,
        slug: this.slug,
        alt: this.alt
      }

      if (this.categories)
        data.categories = this.categories

      if (this.imageFile)
        data.file = this.imageFile

      this.wait = true

      if (!this.brandId) {
        await this.createBrand(data)
          .then(() => {
            if (redirect)
              this.$router.push('/brands')
            this.$toasted.success('The brand was successfully created')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      } else {
        data.id = this.brandId

        await this.updateBrand(data)
          .then(() => {
            this.$toasted.success('The brand was successfully updated')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      }

      this.dataUpdated = false
      this.wait = false
      clearTimeout(this.timer)
    },

    onNameInput () {
      this.slugError = ''
      this.nameError = ''

      if (this.slugBasedOnName) this.slug = slugify(this.name).toLowerCase()
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
