<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <button class="g-button" :class="{'g-button--blinking': dataUpdated}" @click="submit" :disabled="wait">
        <font-awesome-icon icon="save" />
        <span>Save</span>
      </button>
      <router-link class="g-button g-button--danger" to="/colors">
        <font-awesome-icon icon="ban" />
        <span>Cancel</span>
      </router-link>
    </page-header>
    <page-box double>
      <div class="add-edit-page__left">
        <custom-input
          v-model="address.title"
          placeholder="Enter address"
          class="mb-20"
          label="Address"
        />
        <custom-input
          v-model="address.url"
          placeholder="Enter address link"
          class="mb-20"
          label="Address Link"
        />
        <custom-input
          v-model="address.title__az"
          placeholder="Enter address AZ"
          class="mb-20"
          label="Address AZ"
        />
        <custom-input
          v-model="address.url__az"
          placeholder="Enter address link AZ"
          class="mb-20"
          label="Address Link AZ"
        />
        <custom-input
          v-model="email"
          placeholder="Enter email"
          class="mb-20"
          label="Email"
        />
        <custom-input
          v-model="facebook"
          placeholder="Enter facebook"
          class="mb-20"
          label="Facebook"
        />
        <custom-input
          v-model="facebook_pixel"
          placeholder="Enter facebook pixel"
          class="mb-20"
          label="Facebook Pixel"
        />
        <custom-input
          v-model="google"
          placeholder="Enter google"
          class="mb-20"
          label="Google"
        />
        <custom-input
          v-model="google_analytics"
          placeholder="Enter google analytics"
          class="mb-20"
          label="Google Analytics"
        />
        <custom-input
          v-model="google_tag"
          placeholder="Enter google tag"
          class="mb-20"
          label="Google Tag"
        />
        <custom-input
          v-model="instagram"
          placeholder="Enter instagram"
          class="mb-20"
          label="Instagram"
        />
        <custom-input
          v-model="telegram"
          placeholder="Enter telegram"
          class="mb-20"
          label="Telegram"
        />
        <custom-input
          v-model="yandex_metrika"
          placeholder="Enter yandex metrika"
          class="mb-20"
          label="Yandex Metrika"
        />
        <custom-input
          v-model="youtube"
          placeholder="Enter youtube"
          class="mb-20"
          label="Youtube"
        />
      </div>
      <div class="add-edit-page__right">
        <DropImage
          label="Meta Image"
          placeholder="Select image"
          :img-src="meta_image.url"
          @set-image-src="meta_image.url = $event"
          @set-image="metaImageFile = $event; meta_image.url = ''"
          class="mb-20"
        />
        <custom-input
          v-model="phone"
          placeholder="Enter phone"
          class="mb-20"
          label="Phone"
        />
      </div>
      <template #bottom-content>
        <div class="mb-20">Politics</div>
        <custom-multi-input
          v-model="politics"
          :value-template="[
            {
              label: 'Title',
              name: 'title',
              prop: 'title',
              placeholder: 'Enter the title',
              isAllLang: false
            },
            {
              label: 'Title AZ',
              name: 'title__az',
              prop: 'title__az',
              placeholder: 'Enter the title AZ',
              isAllLang: false
            },
            {
              label: 'Url',
              name: 'url',
              prop: 'url',
              placeholder: 'Enter the url',
              isAllLang: false
            },
            {
              label: 'Url AZ',
              name: 'url__az',
              prop: 'url__az',
              placeholder: 'Enter the url AZ',
              isAllLang: false
            },
          ]"
          placeholder="Enter politics"
        />
      </template>
    </page-box>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import DropImage from '@/components/DropImage'

export default {
  name: 'ColorsAddEdit',

  components: {
    DropImage,
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    CustomMultiInput: () => import('@/components/CustomMultiInput')
  },

  data () {
    return {
      address: {
        title: '',
        url: '',
        title__az: '',
        url__az: ''
      },
      email: '',
      facebook: '',
      facebook_pixel: '',
      google: '',
      google_analytics: '',
      google_tag: '',
      instagram: '',
      meta_image: { url: '' },
      phone: '',
      telegram: '',
      yandex_metrika: '',
      youtube: '',
      politics: [],

      metaImageFile: null,

      wait: false,
      loading: false,
      dataUpdated: false,
      dontSendData: false
    }
  },

  async mounted () {
    this.loading = true
    await this.fetchSettings()
      .then(({ data }) => {
        this.email = data.email || ''
        this.facebook = data.facebook || ''
        this.facebook_pixel = data.facebook_pixel || ''
        this.google = data.google || ''
        this.google_analytics = data.google_analytics || ''
        this.google_tag = data.google_tag || ''
        this.instagram = data.instagram || ''
        this.meta_image = data.meta_image || { url: '' }
        this.phone = data.phone || ''
        this.telegram = data.telegram || ''
        this.yandex_metrika = data.yandex_metrika || ''
        this.youtube = data.youtube || ''
        try {
          this.address = JSON.parse(data.address) || this.address
        } catch {}
        try {
          this.politics = JSON.parse(data.politics)
        } catch {}
      })
      .catch(e => {
        console.error(e)
        this.$toasted.error(e.response.data.message)
        this.$router.push('/brands')
      })
    this.loading = false

    // watching variables
    this.$watch(vm => [
      vm.address,
      vm.email,
      vm.facebook,
      vm.facebook_pixel,
      vm.google,
      vm.google_analytics,
      vm.google_tag,
      vm.instagram,
      vm.meta_image,
      vm.phone,
      vm.telegram,
      vm.yandex_metrika,
      vm.youtube,
      vm.politics
    ], () => {
      if (this.id)
        this.dataUpdate()
    })
  },

  computed: {
    pageTitle () {
      return 'Settings'
    },

    id () {
      return 1
    }
  },

  methods: {
    ...mapMutations(['setActiveLang']),
    ...mapActions('settings', ['fetchSettings', 'updateSettings']),

    dataUpdate () {
      this.dataUpdated = true
    },

    onCategoriesSelect (categories) {
      this.categories = categories
    },

    async submit () {
      if (!this.wait) {
        this.wait = true

        const formData = new FormData()
        formData.append('address', JSON.stringify(this.address))
        formData.append('email', this.email)
        formData.append('facebook', this.facebook)
        formData.append('facebook_pixel', this.facebook_pixel)
        formData.append('google', this.google)
        formData.append('google_analytics', this.google_analytics)
        formData.append('google_tag', this.google_tag)
        formData.append('instagram', this.instagram)
        formData.append('meta_image', this.metaImageFile || this.meta_image || { url: '' })
        formData.append('phone', this.phone)
        formData.append('telegram', this.telegram)
        formData.append('yandex_metrika', this.yandex_metrika)
        formData.append('youtube', this.youtube)
        formData.append('politics', JSON.stringify(this.politics))

        await this.updateSettings(formData)
          .then(() => {
            this.$toasted.success('The settings were successfully updated')
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })

        this.dataUpdated = false
        this.wait = false
      }
    }
  },

  beforeRouteLeave (to, from, next) {
    this.dontSendData = true
    this.dataUpdated = false
    next()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/add-edit.scss';
</style>
