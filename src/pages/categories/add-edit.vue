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
      <router-link class="g-button g-button--danger" to="/categories">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box :double="true" class="mb-20">
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
        <editor
          v-model="description"
          @input="onDescriptionInput"
          placeholder="Enter description"
          class="mb-20"
          label="Description"
          v-show="activeLang === 'ru'"
        />
        <editor
          v-model="descriptionAz"
          @input="onDescriptionInput"
          placeholder="Enter description"
          class="mb-20"
          label="Description"
          v-show="activeLang === 'az'"
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
          :value="parent ? (parent.id ? parent.id.toString() : parent.toString()) : null"
          @set-value="onParentSelect"
          :options="cascaderCategories"
          label="Parent category (all languages)"
          placeholder="Select category (or leave it empty)"
        />
      </div>
      <div class="add-edit-page__right">
        <DropImage
          label="Image (all languages)"
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
          label="Alt (all languages)"
        />
      </div>
    </page-box>

    <meta-form
      class="mb-20"
      @submit="onMetaSubmit"
      @set-updated="metaDataUpdated = $event"
      :data-updated="metaDataUpdated"
      :initial-data="meta"
      :loading="metaLoading"
      :url="`https://proximart.az${activeLang === 'az' ? '/az' : ''}/catalog?cat=${categoryId}`"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DropImage from '@/components/DropImage'
import { debounce } from '@/utils/debounce'
import Editor from '@/components/Editor'
const slugify = require('slugify')

export default {
  name: 'CategoriesAddEdit',

  components: {
    Editor,
    DropImage,
    MetaForm: () => import('@/containers/common/MetaForm'),
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomCascader: () => import('@/components/CustomCascader')
  },

  data () {
    return {
      name: '',
      nameAz: '',
      description: '',
      descriptionAz: '',
      alt: '',
      slug: '',
      slugAz: '',
      parent: null,
      image: null,
      imageFile: null,

      slugBasedOnName: true,
      slugBasedOnNameAz: true,

      meta: null,
      metaLoading: false,

      nameError: '',
      nameAzError: '',
      descriptionError: '',
      descriptionAzError: '',
      slugError: '',
      imageError: '',
      altError: '',

      wait: false,
      loading: false,
      dataUpdated: false,
      timer: null,
      timeLeftToUpdate: 0,
      dontSendData: false,
      metaDataUpdated: false
    }
  },

  async created () {
    await this.fetchCascaderCategories()
  },

  async mounted () {
    if (this.categoryId) {
      this.loading = true
      await this.fetchCategory(this.categoryId)
        .then(({ data }) => {
          this.name = data.name ?? ''
          this.nameAz = data.name__az ?? ''
          this.description = data.description ?? ''
          this.descriptionAz = data.description__az ?? ''
          this.alt = data.image?.alt ?? ''
          this.slug = data.slug ?? ''
          this.slugAz = data.slug__az ?? ''
          this.image = data.image?.url ?? ''
          this.parent = data.parent
          this.meta = data.meta

          this.slugBasedOnName = !this.slug
          this.slugBasedOnNameAz = !this.slugAz
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/categories')
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
      vm.slugAz,
      vm.alt,
      vm.imageFile,
      vm.parent
    ], () => {
      if (this.categoryId)
        this.dataUpdate()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('categories', ['cascaderCategories']),

    pageTitle () {
      return this.categoryId ? `Editing category ${this.slug ?? 'with id ' + this.categoryId}` : 'Creating a new category'
    },

    categoryId () {
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
    ...mapActions('categories', ['fetchCascaderCategories', 'createCategory', 'fetchCategory', 'updateCategory', 'saveMeta']),

    dataUpdate () {
      this.dataUpdated = true
      this.startTimer()
      this.onDataUpdate()
    },

    onParentSelect (parent) {
      this.parent = parent
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

    async onMetaSubmit (rawData) {
      if (!this.metaLoading) {
        this.metaLoading = true
        await this.saveMeta({
          meta: {
            ...rawData,
            category: this.categoryId
          },
          metaId: this.meta?.id
        })
          .then(res => {
            this.meta = res?.data
            this.$toasted.success('Categorie\'s meta was successfully saved')
            this.metaDataUpdated = false
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
        this.metaLoading = false
      }
    },

    async submit (redirect) {
      if (!this.wait) {
        this.wait = true

        const data = {
          name: this.name,
          name__az: this.nameAz,
          description: this.description,
          description__az: this.descriptionAz,
          slug: this.slug,
          slug__az: this.slugAz,
          alt: this.alt
        }

        if (this.parent)
          data.parent = this.parent.id ?? this.parent

        if (this.imageFile)
          data.file = this.imageFile

        if (!this.categoryId) {
          await this.createCategory(data)
            .then(() => {
              if (redirect)
                this.$router.push('/categories')
              this.$toasted.success('The category was successfully created')
            })
            .catch(e => {
              console.error(e)
              this.$toasted.error(e.response.data.message)
            })
        } else {
          data.id = this.categoryId

          await this.updateCategory(data)
            .then(() => {
              this.$toasted.success('The category was successfully updated')
            })
            .catch(e => {
              console.error(e)
              this.$toasted.error(e.response.data.message)
            })
        }

        this.dataUpdated = false
        clearTimeout(this.timer)
        this.wait = false
      }
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
