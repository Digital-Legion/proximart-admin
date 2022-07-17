<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

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
// import DropImage from '@/components/DropImage'
import { debounce } from '@/utils/debounce'
export default {
  name: 'CategoriesAddEdit',

  components: {
    // DropImage,
    MetaForm: () => import('@/containers/common/MetaForm')
    // PageHeader: () => import('@/components/PageHeader'),
    // PageTabs: () => import('@/components/PageTabs'),
    // PageBox: () => import('@/components/PageBox'),
    // CustomInput: () => import('@/components/CustomInput'),
    // CustomCascader: () => import('@/components/CustomCascader')
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

  async mounted () {
    if (this.categoryId) {
      this.loading = true
      await this.fetchMeta(this.categoryId)
        .then(({ data }) => {
          this.meta = data
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
          this.$router.push('/meta')
        })
      this.loading = false
    }
  },

  computed: {
    ...mapState(['activeLang', 'langs']),
    ...mapState('meta', ['metas']),

    pageTitle () {
      return this.categoryId ? `Editing meta ${'with id ' + this.categoryId}` : 'Creating a new meta'
    },

    categoryId () {
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
    ...mapActions('meta', ['fetchMetas', 'fetchMeta', 'updateMeta']),

    onDataUpdate: (debounce(function () {
      this.dataUpdated = false
      if (this.timer === null)
        this.submit()
    }, (10 + 1) * 1000)), // update data after N seconds after it's been changed with debounce

    async onMetaSubmit (rawData) {
      rawData.id = this.categoryId
      if (!this.metaLoading) {
        this.metaLoading = true
        await this.updateMeta({
          ...rawData
        })
          .then(res => {
            this.meta = res?.data
            this.$toasted.success('Meta was successfully saved')
            this.metaDataUpdated = false
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
        this.metaLoading = false
      }
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
