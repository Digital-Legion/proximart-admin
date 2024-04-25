<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <button class="g-button" :class="{'g-button--blinking': dataUpdatedGeneral || metaDataUpdated}" @click="onSubmit()" :disabled="wait">
        <font-awesome-icon icon="save" />
        <span>Save</span>
      </button>
      <router-link class="g-button g-button--danger" to="/categories">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box class="mb-20">
      <custom-input
        v-model="title"
        @input="onTitleInput"
        placeholder="Enter title"
        class="mb-20"
        label="Title"
        v-if="activeLang === 'ru'"
      />
      <custom-input
        v-model="titleAz"
        @input="onTitleInput"
        placeholder="Enter title"
        class="mb-20"
        label="Title"
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
      <Editor v-show="activeLang === 'ru'" v-model="text" label="HTML" />
      <Editor v-show="activeLang === 'az'" v-model="textAz" label="HTML" />
    </page-box>

    <meta-form
      @submit="onMetaSave"
      @set-updated="onMetaUpdated"
      :data-updated="metaDataUpdated"
      :initial-data="meta"
      :url="`https://proximart.az${activeLang === 'az' ? '/az' : ''}/catalog?cat=${id}`"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { debounce } from '@/utils/debounce'
import slugify from 'slugify'

export default {
  name: 'CategoriesAddEdit',

  components: {
    MetaForm: () => import('@/containers/common/MetaForm'),
    PageHeader: () => import('@/components/PageHeader'),
    Editor: () => import('@/components/Editor'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput')
  },

  data () {
    return {
      title: '',
      titleAz: '',
      slug: '',
      slugAz: '',
      text: '',
      textAz: '',

      slugBasedOnName: true,
      slugBasedOnNameAz: true,

      meta: null,

      wait: false,
      loading: false,
      dataUpdated: false,
      dataUpdatedGeneral: false,
      timer: null,
      dontSendData: false,
      metaDataUpdated: false
    }
  },

  async mounted () {
    if (this.id) {
      this.loading = true
      await this.fetchPage(this.id)
        .then(({ data }) => {
          this.title = data.title || ''
          this.titleAz = data.title__az || ''
          this.slug = data.slug || ''
          this.slugAz = data.slug__az || ''
          this.text = data.text || ''
          this.textAz = data.text__az || ''
          this.slugBasedOnName = !this.title
          this.slugBasedOnNameAz = !this.titleAz
          this.meta = {
            meta_title: data.meta_title || '',
            meta_title__az: data.meta_title__az || '',
            meta_description: data.meta_description || '',
            meta_description__az: data.meta_description__az || '',
            description: data.description || '',
            description__az: data.description__az || '',
            meta_keywords: data.meta_keywords || '',
            meta_keywords__az: data.meta_keywords__az || '',
            meta_image: data.meta_image || {},
            facebook_title: data.facebook_title || '',
            facebook_title__az: data.facebook_title__az || '',
            facebook_description: data.facebook_description || '',
            facebook_description__az: data.facebook_description__az || '',
            facebook_image: data.facebook_image || {},
            twitter_title: data.twitter_title || '',
            twitter_title__az: data.twitter_title__az || '',
            twitter_description: data.twitter_description || '',
            twitter_description__az: data.twitter_description__az || '',
            twitter_image: data.twitter_image || {}
          }
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/page')
        })
      this.loading = false
    }

    this.$watch(vm => [
      vm.title,
      vm.titleAz,
      vm.text,
      vm.textAz,
      vm.slug,
      vm.slugAz
    ], () => {
      this.dataUpdateGeneral()
    })

    this.$watch(vm => [
      vm.dataUpdatedGeneral,
      vm.metaDataUpdated
    ], () => {
      this.checkDataUpdated()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('page', ['pages']),

    pageTitle () {
      return this.id ? `Editing page ${'with id ' + this.id}` : 'Creating a new page'
    },

    id () {
      return this.$route.params.id
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
    ...mapActions('page', ['fetchPages', 'fetchPage', 'updatePage']),

    onDataUpdate: (debounce(function () {
      this.dataUpdated = false
      if (this.timer === null)
        this.submit()
    }, (10 + 1) * 1000)), // update data after N seconds after it's been changed with debounce

    dataUpdateGeneral () {
      this.dataUpdatedGeneral = true
    },

    checkDataUpdated () {
      if (this.dataUpdatedGeneral || this.metaDataUpdated) {
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

    onMetaUpdated (val) {
      this.metaDataUpdated = val
    },

    async onSubmit () {
      if (!this.loading) {
        this.loading = true
        await this.updatePage({
          id: this.id || 0,
          ...this.meta,
          title: this.title,
          title__az: this.titleAz,
          slug: this.slug,
          slug__az: this.slugAz,
          text: this.text,
          text__az: this.textAz
        })
          .then(() => {
            this.dataUpdatedGeneral = false
            this.dataUpdated = false
            this.metaDataUpdated = false
            this.$toasted.success('Page was successfully saved')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
        this.loading = false
      }
    },

    onMetaSave (newMeta) {
      this.$set(this, 'meta', newMeta)
      this.metaDataUpdated = false
      this.onSubmit()
    },

    onTitleInput () {
      if (this.slugBasedOnName) this.slug = slugify(this.name).toLowerCase()
      if (this.slugBasedOnNameAz) this.slugAz = slugify(this.nameAz).toLowerCase()
    },

    onSlugInput () {
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
