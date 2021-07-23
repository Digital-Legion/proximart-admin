<template>
  <div class="meta-form">
    <page-tabs @input="setActiveLang" :value="activeLang" :options="langs"/>
    <flip-card :flipped="showPreviews">
      <template v-slot:front>
        <page-box :double="true">
          <template v-slot:outer-content>
            <loading
              :active.sync="loading"
              :can-cancel="false"
              :is-full-page="false"
            />

            <page-header class="mb-20 w-100">
              <template v-slot:content>
                <h2 class="g-title">Metadata</h2>
              </template>
              <button class="g-button" :class="{ 'g-button--blinking': dataUpdated }" @click="onSubmit"
                      :disabled="loading">
                <font-awesome-icon icon="save"/>
                <span>Save</span>
              </button>
              <button class="g-button g-button--icon" :class="{ 'g-button--blinking': dataUpdated }"
                      @click="toggleShowPreviews">
                <font-awesome-icon icon="eye"/>
              </button>
            </page-header>

            <div class="w-100">
              <custom-input
                class="mb-20"
                v-model="metaTitle"
                label="Meta title"
                placeholder="Enter meta title"
                v-if="activeLang === 'ru'"
              />
              <custom-input
                class="mb-20"
                v-model="metaTitleAz"
                label="Meta title"
                placeholder="Enter meta title"
                v-else-if="activeLang === 'az'"
              />
              <custom-input
                class="mb-20"
                v-model="metaDescription"
                :is-textarea="true"
                label="Meta description"
                placeholder="Enter meta description"
                v-if="activeLang === 'ru'"
              />
              <custom-input
                class="mb-20"
                v-model="metaDescriptionAz"
                :is-textarea="true"
                label="Meta description"
                placeholder="Enter meta description"
                v-else-if="activeLang === 'az'"
              />
              <custom-input
                class="mb-20"
                v-model="metaKeywords"
                label="Meta keywords"
                placeholder="Enter meta keywords (separate them by comma)"
                v-if="activeLang === 'ru'"
              />
              <custom-input
                class="mb-20"
                v-model="metaKeywordsAz"
                label="Meta keywords"
                placeholder="Enter meta keywords (separate them by comma)"
                v-else-if="activeLang === 'az'"
              />
            </div>
          </template>

          <div class="add-edit-page__left">
            <custom-input
              class="mb-20"
              v-model="facebookTitle"
              label="Facebook title"
              placeholder="Enter facebook title"
              v-if="activeLang === 'ru'"
            />
            <custom-input
              class="mb-20"
              v-model="facebookTitleAz"
              label="Facebook title"
              placeholder="Enter facebook title"
              v-else-if="activeLang === 'az'"
            />
            <custom-input
              v-model="facebookDescription"
              :is-textarea="true"
              label="Facebook description"
              placeholder="Enter facebook description"
              v-if="activeLang === 'ru'"
            />
            <custom-input
              v-model="facebookDescriptionAz"
              :is-textarea="true"
              label="Facebook description"
              placeholder="Enter facebook description"
              v-else-if="activeLang === 'az'"
            />
          </div>
          <div class="add-edit-page__right">
            <custom-input
              class="mb-20"
              v-model="twitterTitle"
              label="Twitter title"
              placeholder="Enter twitter title"
              v-if="activeLang === 'ru'"
            />
            <custom-input
              class="mb-20"
              v-model="twitterTitleAz"
              label="Twitter title"
              placeholder="Enter twitter title"
              v-else-if="activeLang === 'az'"
            />
            <custom-input
              v-model="twitterDescription"
              :is-textarea="true"
              label="Twitter description"
              placeholder="Enter twitter description"
              v-if="activeLang === 'ru'"
            />
            <custom-input
              v-model="twitterDescriptionAz"
              :is-textarea="true"
              label="Twitter description"
              placeholder="Enter twitter description"
              v-else-if="activeLang === 'az'"
            />
          </div>

          <template v-slot:bottom-content>
            <div class="g-flex-wrap mt-20 add-edit-page__drop-image-wrapper">
              <drop-image
                label="Meta image"
                class="add-edit-page__drop-image add-edit-page__drop-image--md-triple"
                :img-src="metaImageUrl"
                @set="metaImageFile = $event.file; metaImageUrl = $event.src"
              />
              <drop-image
                label="Facebook image"
                class="add-edit-page__drop-image add-edit-page__drop-image--md-triple"
                :img-src="facebookImageUrl"
                @set="facebookImageFile = $event.file; facebookImageUrl = $event.src"
              />
              <drop-image
                label="Twitter image"
                class="add-edit-page__drop-image add-edit-page__drop-image--md-triple"
                :img-src="twitterImageUrl"
                @set="twitterImageFile = $event.file; twitterImageUrl = $event.src"
              />
            </div>
          </template>
        </page-box>
      </template>
      <template v-slot:back>
        <page-box class="flip-card-back-content">
          <template v-slot:outer-content>
            <page-header class="mb-20 w-100">
              <template v-slot:content>
                <h2 class="g-title">Metadata</h2>
              </template>
              <button class="g-button g-button--icon" :class="{ 'g-button--blinking': dataUpdated }"
                      @click="toggleShowPreviews">
                <font-awesome-icon icon="eye-slash"/>
              </button>
            </page-header>
          </template>

          <div class="flip-card-back-inner">
            <google-meta
              class="mb-20"
              :title="titleMeta"
              :url="url"
              :description="descriptionMeta"
            />
            <div class="g-flex-wrap w-100--20 mx--10">
              <facebook-meta
                class="mx-10 mx-10-w-50"
                :title="titleFacebook"
                :url="url"
                :image="facebookImageUrl ? facebookImageUrl : defaultImage"
                :description="descriptionFacebook"
              />
              <twitter-meta
                class="mx-10 mx-10-w-50"
                :title="titleTwitter"
                :url="url"
                :image="twitterImageUrl ? twitterImageUrl : defaultImage"
                :description="descriptionTwitter"
              />
            </div>
          </div>
        </page-box>
      </template>
    </flip-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'MetaForm',

  components: {
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    PageHeader: () => import('@/components/PageHeader'),
    CustomInput: () => import('@/components/CustomInput'),
    DropImage: () => import('@/components/DropImage'),
    FlipCard: () => import('@/components/FlipCard'),
    GoogleMeta: () => import('@/components/GoogleMeta'),
    FacebookMeta: () => import('@/components/FacebookMeta'),
    TwitterMeta: () => import('@/components/TwitterMeta')
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    initialData: {
      default: null
    },
    dataUpdated: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      showPreviews: false,
      justSetInitialData: false,
      initialDataSet: false,
      defaultImage: 'https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png',

      // meta data
      metaTitle: '',
      metaTitleAz: '',
      metaDescription: '',
      metaDescriptionAz: '',
      metaKeywords: '',
      metaKeywordsAz: '',
      metaImageUrl: '',
      metaImageFile: null,
      // twitter data
      twitterTitle: '',
      twitterTitleAz: '',
      twitterDescription: '',
      twitterDescriptionAz: '',
      twitterImageUrl: '',
      twitterImageFile: null,
      // facebook data
      facebookTitle: '',
      facebookTitleAz: '',
      facebookDescription: '',
      facebookDescriptionAz: '',
      facebookImageUrl: '',
      facebookImageFile: null
    }
  },

  mounted () {
    this.setInitialData()

    this.$watch(vm => [
      vm.metaTitle,
      vm.metaTitleAz,
      vm.metaDescription,
      vm.metaDescriptionAz,
      vm.metaKeywords,
      vm.metaKeywordsAz,
      vm.metaImageFile,
      // twitter data
      vm.twitterTitle,
      vm.twitterTitleAz,
      vm.twitterDescription,
      vm.twitterDescriptionAz,
      vm.twitterImageFile,
      // facebook data
      vm.facebookTitle,
      vm.facebookTitleAz,
      vm.facebookDescription,
      vm.facebookDescriptionAz,
      vm.facebookImageFile
    ], () => {
      if (!this.justSetInitialData) {
        this.$emit('set-updated', true)
      } else {
        this.justSetInitialData = false
        this.$emit('set-updated', false)
      }
    })
  },

  watch: {
    initialData () {
      this.setInitialData()
    }
  },

  computed: {
    ...mapState(['activeLang', 'langs']),

    titleMeta () {
      return this.activeLang === 'ru' ? (this.metaTitle ? this.metaTitle : 'Google Meta — PROXIMART') : this.activeLang === 'az' ? (this.metaTitleAz ? this.metaTitleAz : 'Google Meta — PROXIMART') : 'Google Meta — PROXIMART'
    },

    descriptionMeta () {
      return this.activeLang === 'ru' ? (this.metaDescription ? this.metaDescription : 'This is how it\'s going to look like') : this.activeLang === 'az' ? (this.metaDescriptionAz ? this.metaDescriptionAz : 'This is how it\'s going to look like') : 'This is how it\'s going to look like'
    },

    titleFacebook () {
      return this.activeLang === 'ru' ? (this.facebookTitle ? this.facebookTitle : 'Facebook Meta — PROXIMART') : this.activeLang === 'az' ? (this.facebookTitleAz ? this.facebookTitleAz : 'Facebook Meta — PROXIMART') : 'Facebook Meta — PROXIMART'
    },

    descriptionFacebook () {
      return this.activeLang === 'ru' ? (this.facebookDescription ? this.facebookDescription : 'This is how it\'s going to look like') : this.activeLang === 'az' ? (this.facebookDescriptionAz ? this.facebookDescriptionAz : 'This is how it\'s going to look like') : 'This is how it\'s going to look like'
    },

    titleTwitter () {
      return this.activeLang === 'ru' ? (this.twitterTitle ? this.twitterTitle : 'Twitter Meta — PROXIMART') : this.activeLang === 'az' ? (this.twitterTitleAz ? this.twitterTitleAz : 'Twitter Meta — PROXIMART') : 'Twitter Meta — PROXIMART'
    },

    descriptionTwitter () {
      return this.activeLang === 'ru' ? (this.twitterDescription ? this.twitterDescription : 'This is how it\'s going to look like') : this.activeLang === 'az' ? (this.twitterDescriptionAz ? this.twitterDescriptionAz : 'This is how it\'s going to look like') : 'This is how it\'s going to look like'
    }
  },

  methods: {
    ...mapMutations(['setActiveLang']),

    toggleShowPreviews () {
      this.showPreviews = !this.showPreviews
    },

    setInitialData () {
      if (this.initialData && !this.initialDataSet) {
        this.metaTitle = this.initialData.meta_title ?? ''
        this.metaTitleAz = this.initialData.meta_title__az ?? ''
        this.metaDescription = this.initialData.meta_description ?? ''
        this.metaDescriptionAz = this.initialData.meta_description__az ?? ''
        this.metaKeywords = this.initialData.meta_keywords ?? ''
        this.metaKeywordsAz = this.initialData.meta_keywords__az ?? ''
        this.metaImageUrl = this.initialData.meta_image ?? ''
        this.facebookTitle = this.initialData.facebook_title ?? ''
        this.facebookTitleAz = this.initialData.facebook_title__az ?? ''
        this.facebookDescription = this.initialData.facebook_description ?? ''
        this.facebookDescriptionAz = this.initialData.facebook_description__az ?? ''
        this.facebookImageUrl = this.initialData.facebook_image ?? ''
        this.twitterTitle = this.initialData.twitter_title ?? ''
        this.twitterTitleAz = this.initialData.twitter_title__az ?? ''
        this.twitterDescription = this.initialData.twitter_description ?? ''
        this.twitterDescriptionAz = this.initialData.twitter_description__az ?? ''
        this.twitterImageUrl = this.initialData.twitter_image ?? ''
        this.justSetInitialData = true
        this.initialDataSet = true
      }
    },

    onSubmit () {
      const data = {
        meta_title: this.metaTitle,
        meta_title__az: this.metaTitleAz,
        meta_description: this.metaDescription,
        meta_description__az: this.metaDescriptionAz,
        meta_keywords: this.metaKeywords,
        meta_keywords__az: this.metaKeywordsAz,
        facebook_title: this.facebookTitle,
        facebook_title__az: this.facebookTitleAz,
        facebook_description: this.facebookDescription,
        facebook_description__az: this.facebookDescriptionAz,
        twitter_title: this.twitterTitle,
        twitter_title__az: this.twitterTitleAz,
        twitter_description: this.twitterDescription,
        twitter_description__az: this.twitterDescriptionAz
      }

      if (this.metaImageFile || this.metaImageUrl) {
        data.meta_image = this.metaImageFile || this.metaImageUrl
      }

      if (this.facebookImageFile || this.facebookImageUrl) {
        data.facebook_image = this.facebookImageFile || this.facebookImageUrl
      }

      if (this.twitterImageFile || this.twitterImageUrl) {
        data.twitter_image = this.twitterImageFile || this.twitterImageUrl
      }

      this.$emit('submit', data)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/meta-form';
</style>
