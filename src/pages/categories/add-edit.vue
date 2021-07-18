<template>
  <div class="categories-add-edit-page">
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
      <router-link class="g-button" to="/categories">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box :double="true">
      <div class="categories-add-edit-page__left">
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
          :value="parent ? (parent.id ? parent.id.toString() : parent.toString()) : null"
          @set-value="onParentSelect"
          :options="cascaderCategories"
          label="Parent category (all languages)"
          placeholder="Select category (or leave it empty)"
        />
      </div>
      <div class="categories-add-edit-page__right">
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DropImage from '@/components/DropImage'
import { debounce } from '@/utils/debounce'
const slugify = require('slugify')

export default {
  name: 'CategoriesAddEdit',

  components: {
    DropImage,
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
      parent: null,
      image: null,
      imageFile: null,

      slugBasedOnName: true,

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
      dontSendData: false
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
          this.name = data.name
          this.nameAz = data.name__az
          this.description = data.description
          this.descriptionAz = data.description__az
          this.alt = data.image?.alt ?? ''
          this.slug = data.slug
          this.image = data.image?.url ?? ''
          this.parent = data.parent

          this.slugBasedOnName = this.slug === ''
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
    ...mapActions('categories', ['fetchCascaderCategories', 'createCategory', 'fetchCategory', 'updateCategory']),

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

    async submit (redirect) {
      const data = {
        name: this.name,
        name__az: this.nameAz,
        description: this.description,
        description__az: this.descriptionAz,
        slug: this.slug,
        alt: this.alt
      }

      if (this.parent)
        data.parent = this.parent.id ?? this.parent

      if (this.imageFile)
        data.file = this.imageFile

      this.wait = true

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
      this.slugBasedOnName = false
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
@import '@/assets/styles/pages/categories/add-edit.scss';
</style>
