<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <router-link class="g-button g-button--danger" to="/products">
        <font-awesome-icon icon="ban"/>
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs"/>
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
            <font-awesome-icon icon="save"/>
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
        <custom-select
          :value="devices"
          @set-value="devices = $event"
          :multiple="true"
          :options="allDevices"
          label="Devices (all languages)"
          placeholder="Select devices (or leave it empty)"
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
        <custom-checkbox
          style="margin-top: 40px"
          label="Show on main page"
          v-model="showOnMainPage"
        />
        <custom-checkbox
          label="Hit"
          v-model="isHit"
        />
        <custom-checkbox
          label="Credit"
          v-model="canCredit"
        />
      </div>

      <template v-slot:bottom-content>
        <h2 class="g-subtitle mt-20">Youtube videos</h2>
        <custom-multi-input
          v-model="youtubeVideos"
          :value-template="[
            {
              label: 'Title',
              name: 'title',
              prop: 'title',
              placeholder: 'Enter the title',
              isAllLang: false
            },
            {
              label: 'Poster url (all langs)',
              name: 'url',
              prop: 'poster',
              placeholder: 'Enter the poster url',
              isAllLang: true
            },
            {
              label: 'Youtube link (all langs)',
              name: 'url',
              prop: 'url',
              placeholder: 'e.g. https://youtu.be/UxpRVIRsgh8',
              isAllLang: true
            }
          ]"
          placeholder="Enter a YouTube video link"
        />
      </template>
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
            <h2 class="g-subtitle mb-0">({{ currentColor.id }}) {{ currentColor.name }} #{{ currentColor.hex }} </h2>
          </template>
          <button class="g-button" :class="{ 'g-button--blinking': !currentColor.saved }" @click="onColorSave"
                  :disabled="waitColor">
            <font-awesome-icon icon="save"/>
            <span>Save</span>
          </button>
          <button class="g-button g-button--danger" @click="onColorRemove">
            <font-awesome-icon icon="trash"/>
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
      class="mb-20"
      @submit="onMetaSubmit"
      @set-updated="metaDataUpdated = $event"
      :data-updated="metaDataUpdated"
      :initial-data="meta"
      :loading="metaLoading"
      :url="`https://proximart.az${activeLang === 'az' ? '/az' : ''}/product/${activeLang === 'ru' ? slug : activeLang === 'az' && slugAz ? slugAz : ''}`"
    />

    <banner-box
      :loading="bannerLoading"
      @set-loading="bannerLoading = $event"
      :initial-data="banner"
      :data-updated="dataUpdatedBanner"
      @set-updated="dataUpdatedBanner = $event"
      :product-id="productId"
      @set-banner="banner = $event"
    />

    <parameters-box
      v-if="category && parameters.items && parameters.items.length"
      class="mt-20"
      @submit="onParametersSubmit"
      :initial-data="parameters.items || []"
      :data-updated="dataUpdatedParameters"
      @set-updated="dataUpdatedParameters = $event"
      :loading="parametersLoading"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import DropImage from '@/components/DropImage'

const slugify = require('slugify')

export default {
  name: 'ProductsAddEdit',

  components: {
    DropImage,
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomCheckbox: () => import('@/components/CustomCheckbox'),
    CustomMultiInput: () => import('@/components/CustomMultiInput'),
    CustomCascader: () => import('@/components/CustomCascader'),
    CustomSelect: () => import('@/components/CustomSelect'),
    MetaForm: () => import('@/containers/common/MetaForm'),
    ParametersBox: () => import('@/containers/common/ParametersBox'),
    BannerBox: () => import('@/containers/common/BannerBox')
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
      devices: null,
      youtubeVideos: null,
      isHit: false,
      showOnMainPage: false,
      canCredit: false,

      banner: null,
      bannerLoading: false,

      parameters: {},
      parametersLoading: false,

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
      waitParameters: false,
      loading: false,
      dataUpdatedGeneral: false,
      dataUpdatedColors: false,
      dataUpdatedParameters: false,
      dataUpdatedBanner: false,
      metaDataUpdated: false,
      dontSendData: false
    }
  },

  async created () {
    await this.fetchCascaderCategories()
    await this.fetchAllBrands()
    await this.fetchAllColors()
    await this.fetchAllDevices()
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
          this.brand = data.brand?.id || null
          this.devices = data.devices?.map(v => v.id) ?? null
          this.meta = data.meta
          this.banner = data.banners?.[0] || null
          this.isHit = data.hit
          this.showOnMainPage = data.main_page
          this.canCredit = data.credit
          this.parameters = {
            id: data.parameters?.id || null
          }
          if (data.youtube) {
            this.youtubeVideos = data.youtube
          }
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
      await this.getParameters()
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
      vm.brand,
      vm.youtubeVideos,
      vm.isHit,
      vm.showOnMainPage
    ], () => {
      this.dataUpdateGeneral()
    })

    this.$watch(vm => [
      vm.dataUpdatedGeneral,
      vm.metaDataUpdated,
      vm.dataUpdatedColors,
      vm.dataUpdatedParameters
    ], () => {
      this.checkDataUpdated()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('categories', ['cascaderCategories']),
    ...mapState('products', ['allBrands', 'allColors', 'allDevices']),

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
    ...mapActions('banners', ['fetchBanner']),
    ...mapActions('products', [
      'updateProduct',
      'fetchProduct',
      'fetchAllBrands',
      'fetchAllColors',
      'saveParameters',
      'fetchAllDevices',
      'fetchAllParameters',
      'updateProductColor',
      'createProductColor',
      'deleteProductColor',
      'saveMeta'
    ]),

    dataUpdateGeneral () {
      this.dataUpdatedGeneral = true
    },

    checkDataUpdated () {
      if (this.dataUpdatedGeneral ||
        this.metaDataUpdated ||
        this.dataUpdatedColors ||
        this.dataUpdatedParameters ||
        this.dataUpdatedBanner) {
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
      this.dataUpdatedColors = true
    },

    onImageSet (imageData, index) {
      const currentColor = this.currentColor

      currentColor.saved = false

      if (imageData.file === '') {
        if (index === currentColor.images.length - 1) {
          currentColor.images[index] = null
        } else {
          currentColor.images.splice(index, 1)
        }
      } else {
        currentColor.images[index] = imageData
      }

      const images = currentColor.images
      if (images[images.length - 1] !== null) {
        images.push(null)
      }

      this.$set(this.colors, currentColor.id.toString(), currentColor)
      this.dataUpdatedColors = true
    },

    async onColorSave () {
      if (!this.waitColor) {
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
              this.checkColorsUpdated()
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
              this.checkColorsUpdated()
            })
            .catch(e => {
              console.error(e)
              this.$toasted.error(e.response.data.message)
            })
        }
        this.waitColor = false
      }
    },

    async onColorRemove () {
      this.$confirm('This will permanently delete the color of the product and its images. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        if (!this.waitColor) {
          this.waitColor = true
          let error = false
          const colorIdToRemove = this.currentColorId.toString(),
            colors = Object.assign({}, this.colors)
          if (!this.currentColor.new) {
            await this.deleteProductColor({ id: this.currentColor.relationId })
              .then(() => {
                this.$toasted.success(`The color with id ${colorIdToRemove} was removed`)
              })
              .catch(e => {
                error = true
                console.error(e)
                this.$toasted.error(e.response.data.message)
              })
          }

          if (!error) {
            delete colors[colorIdToRemove]
            this.$set(this, 'colors', colors)
            this.currentColorId = this.colorsValues[0]?.id ?? null
            this.checkColorsUpdated()
          }
          this.waitColor = false
        }
      }).catch(() => {
      })
    },

    checkColorsUpdated () {
      this.dataUpdatedColors = this.colorsValues.some(data => data !== null && !data.saved)
    },

    async onCategorySelect (category) {
      this.category = category
      this.parameters = {}
    },

    async onProductSave () {
      if (!this.waitGeneral) {
        this.waitGeneral = true

        const productData = {
          name: this.name,
          name__az: this.nameAz,
          description: this.description,
          description__az: this.descriptionAz,
          slug: this.slug,
          slug__az: this.slugAz,
          hit: this.isHit,
          main_page: this.showOnMainPage,
          price: parseFloat(this.price ? this.price : '0'),
          stock: parseInt(this.stock ? this.stock : '0'),
          discount: parseFloat(this.discount ? this.discount : '0'),
          brand: this.brand,
          id: parseInt(this.productId),
          category: this.category,
          devices: this.devices?.length ? this.devices.join(',') : '',
          youtube: this.youtubeVideos || null,
          credit: this.canCredit
        }

        if (this.imageFile) {
          productData.file = this.imageFile
        }

        let isProductUpdated = true
        await this.updateProduct(productData)
          .catch(e => {
            isProductUpdated = 'no-product'
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })

        if (isProductUpdated === true) {
          this.$toasted.success('The product was successfully updated')
        }

        this.dataUpdatedGeneral = false
        this.waitGeneral = false

        if (this.category && !this.parameters.items) {
          this.parametersLoading = true
          await this.getParameters()
          this.parametersLoading = false
        } else {
          this.$set(this, 'parameters', {})
        }
      }
    },

    async onMetaSubmit (rawData) {
      if (!this.metaLoading) {
        this.metaLoading = true
        await this.saveMeta({
          meta: {
            ...rawData,
            product: this.productId
          },
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
      }
    },

    onNameInput () {
      this.slugError = ''
      if (this.activeLang === 'ru') {
        this.nameError = ''
      } else if (this.activeLang === 'az') {
        this.nameAzError = ''
      }

      if (this.slugBasedOnName) this.slug = slugify(this.name).toLowerCase()
      if (this.slugBasedOnNameAz) this.slugAz = slugify(this.nameAz).toLowerCase()
    },

    onDescriptionInput () {
      if (this.activeLang === 'ru') {
        this.descriptionError = ''
      } else if (this.activeLang === 'az') {
        this.descriptionAzError = ''
      }
    },

    onSlugInput () {
      this.slugError = ''
      this.slugBasedOnName = !this.slug
      this.slugBasedOnNameAz = !this.slugAz
      this.slug = slugify(this.slug).toLowerCase()
      this.slugAz = slugify(this.slugAz).toLowerCase()
    },

    async getParameters () {
      return new Promise((resolve) => {
        if (this.category) {
          this.fetchAllParameters(this.productId)
            .then(res => {
              this.$set(this, 'parameters', {
                ...this.parameters,
                items: res.data.map(i => ({
                  ...i,
                  value: i.value?.[0]?.value || '',
                  value__az: i.value?.[0]?.value__az || '',
                  relationId: i.value?.[0]?.id || null
                }))
              })
              resolve(res)
            })
            .catch(e => {
              console.error(e.response.data.message)
              this.$toasted.error('An error occured while fetching parameters')
              resolve(e)
            })
        } else {
          resolve(false)
        }
      })
    },

    async onParametersSubmit (data) {
      if (!this.waitParameters) {
        this.waitParameters = true
        await this.saveParameters({
          values: data.map(i => ({
            ...i,
            product: parseInt(this.productId)
          }))
        })
          .then((res) => {
            this.$toasted.success('Product\'s parameters were successfully saved')
            this.dataUpdatedParameters = false
            if (res?.data?.length) {
              const parametersItems = this.parameters?.items?.slice()
              res.data.forEach(value => {
                const item = parametersItems.find(pi => pi.id === value.parameter.id)
                if (item) {
                  item.relationId = value.id
                  item.value = value.value
                  item.value__az = value.value__az
                }
              })
              this.$set(this.parameters, 'items', parametersItems)
            }
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
        this.waitParameters = false
      }
    }
  },

  beforeRouteLeave (to, from, next) {
    if (!this.checkDataUpdated()) {
      next()
    } else {
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
