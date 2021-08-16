<template>
  <div class="banner-box">
    <page-tabs @input="setActiveLang" :value="activeLang" :options="langs"/>
    <page-box :double="true">
      <template v-slot:outer-content>
        <loading
          :active.sync="loading"
          :can-cancel="false"
          :is-full-page="false"
        />

        <page-header class="mb-20 w-100">
          <template v-slot:content>
            <h2 class="g-title">Banner</h2>
          </template>
          <button class="g-button" :class="{ 'g-button--blinking': dataUpdated }" @click="onSave"
                  :disabled="loading || !dataUpdated">
            <font-awesome-icon icon="save"/>
            <span>Save</span>
          </button>
          <button
            class="g-button g-button--danger"
            @click="onRemove"
            v-if="bannerId !== null"
            :disabled="loading"
          >
            <font-awesome-icon icon="trash"/>
            <span>Remove</span>
          </button>
        </page-header>
      </template>

      <div class="add-edit-page__left">
        <custom-input
          class="mb-20"
          v-model="name"
          label="Name"
          placeholder="Enter name"
          v-if="activeLang === 'ru'"
        />
        <custom-input
          class="mb-20"
          v-model="nameAz"
          label="Name"
          placeholder="Enter name"
          v-else-if="activeLang === 'az'"
        />
        <drop-image
          label="Desktop image (all languages)"
          class="add-edit-page__drop-image"
          :img-src="deskImageUrl"
          @set="deskImageFile = $event.file; deskImageUrl = $event.src"
        />
      </div>
      <div class="add-edit-page__right">
        <custom-select
          class="mb-20"
          :value="bannerType ? bannerType.id : null"
          @set-value="bannerType = bannerTypes[$event]"
          :options="Object.values(bannerTypes).filter(b => b.id !== 'all')"
          label="Banner type"
          placeholder="Select the banner type"
        />
        <drop-image
          label="Mobile image (all languages)"
          class="add-edit-page__drop-image"
          :img-src="mobImageUrl"
          @set="mobImageFile = $event.file; mobImageUrl = $event.src"
        />
      </div>
    </page-box>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'BannerBox',

  components: {
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    PageHeader: () => import('@/components/PageHeader'),
    CustomSelect: () => import('@/components/CustomSelect'),
    CustomInput: () => import('@/components/CustomInput'),
    DropImage: () => import('@/components/DropImage')
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
    productId: {
      type: [Number, String],
      default: null
    }
  },

  data () {
    return {
      bannerExists: false,
      justSetInitialData: false,
      initialDataSet: false,

      bannerId: null,
      name: '',
      nameAz: '',
      deskImageUrl: null,
      deskImageFile: null,
      mobImageUrl: null,
      mobImageFile: null,
      bannerType: this.$store.state.banners.bannerTypes.large
    }
  },

  mounted () {
    this.$watch(vm => [
      vm.name,
      vm.nameAz,
      vm.bannerType,
      vm.deskImageUrl,
      vm.deskImageFile,
      vm.mobImageUrl,
      vm.mobImageFile
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
    ...mapState(['activeLang', 'defaultActiveLang', 'langs']),
    ...mapState('banners', ['bannerTypes'])
  },

  methods: {
    ...mapMutations(['setActiveLang']),
    ...mapActions('banners', ['createBanner', 'updateBanner', 'removeBanner']),

    setInitialData () {
      if (this.initialData && !this.initialDataSet) {
        this.bannerId = this.initialData.id || null
        this.name = this.initialData.name || ''
        this.nameAz = this.initialData.name__az || ''
        this.deskImageUrl = this.initialData.desktop?.url || null
        this.mobImageUrl = this.initialData.mobile?.url || null
        this.bannerType = this.initialData.big_banner
          ? this.$store.state.banners.bannerTypes.large
          : this.$store.state.banners.bannerTypes.small

        this.justSetInitialData = true
        this.initialDataSet = true
      }
    },

    async onSave () {
      const data = {
        name: this.name,
        name__az: this.nameAz,
        desktop: this.deskImageFile || this.deskImageUrl,
        mobile: this.mobImageFile || this.mobImageUrl,
        big_banner: this.bannerType.value,
        product: this.productId
      }

      this.$emit('set-loading', true)
      if (this.bannerId) {
        data.id = this.bannerId
        await this.updateBanner(data)
          .then(() => {
            this.$toasted.success(`The banner with id ${this.bannerId} was saved`)
            this.$emit('set-updated', false)
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      } else {
        await this.createBanner(data)
          .then(res => {
            this.bannerId = res.data.id
            this.$toasted.success(`The banner with id ${this.bannerId} was saved`)
            this.$emit('set-updated', false)
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(e.response.data.message)
          })
      }
      this.$emit('set-loading', false)
    },

    onRemove () {
      const id = this.bannerId
      this.$confirm('This will permanently delete the banner. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.$emit('set-loading', true)
        await this.removeBanner({ id, removeInBanners: false })
          .then(() => {
            this.$emit('set-banner', null)

            this.bannerId = null
            this.name = ''
            this.nameAz = ''
            this.deskImageFile = null
            this.deskImageUrl = null
            this.mobImageFile = null
            this.mobImageUrl = null
            this.justSetInitialData = true

            this.$message({
              type: 'success',
              message: `Banner with id ${id} was removed`
            })
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
          })
        this.$emit('set-loading', false)
        this.$emit('set-loading', false)
      }).catch(() => {})
    }
  }
}
</script>
