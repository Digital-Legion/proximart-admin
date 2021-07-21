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
      <router-link class="g-button" to="/colors">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
    <page-box :double="true">
      <div class="categories-add-edit-page__left">
        <custom-input
          v-model="name"
          placeholder="Enter name"
          class="mb-20"
          label="Name"
          v-if="activeLang === 'ru'"
        />
        <custom-input
          v-model="nameAz"
          placeholder="Enter name"
          class="mb-20"
          label="Name"
          v-else-if="activeLang === 'az'"
        />
      </div>
      <div class="categories-add-edit-page__right">
        <custom-color-picker
          v-model="color"
          label="Color (all languages)"
        />
      </div>
    </page-box>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { debounce } from '@/utils/debounce'

export default {
  name: 'BrandsAddEdit',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomColorPicker: () => import('@/components/CustomColorPicker')
  },

  data () {
    return {
      name: '',
      nameAz: '',
      color: '',

      wait: false,
      loading: false,
      dataUpdated: false,
      timer: null,
      timeLeftToUpdate: 0,
      dontSendData: false
    }
  },

  async mounted () {
    if (this.colorId) {
      this.loading = true
      await this.fetchColor(this.colorId)
        .then(({ data }) => {
          this.name = data.name
          this.nameAz = data.name__az
          this.color = data.color ? `#${data.color}` : null
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
      vm.nameAz,
      vm.color
    ], () => {
      if (this.colorId)
        this.dataUpdate()
    })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),

    pageTitle () {
      return this.colorId ? `Editing color ${this.name ?? 'with id ' + this.colorId}` : 'Creating a new color'
    },

    colorId () {
      return this.$route.params.id
    },

    defaultLangError () {
      return false
    },

    azLangError () {
      return false
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
    ...mapActions('colors', ['fetchColor', 'createColor', 'updateColor']),

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
        name__az: this.nameAz,
        hex: this.color ? this.color.slice(1) : ''
      }

      this.wait = true

      if (!this.colorId) {
        await this.createColor(data)
          .then(() => {
            if (redirect)
              this.$router.push('/colors')
            this.$toasted.success('The color was successfully created')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      } else {
        data.id = this.colorId

        await this.updateColor(data)
          .then(() => {
            this.$toasted.success('The color was successfully updated')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      }

      this.dataUpdated = false
      this.wait = false
      clearTimeout(this.timer)
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
