<template>
  <div class="parameters-page">
    <page-header title="Banners">
      <custom-select
        :value="bannerType ? bannerType.id : null"
        @set-value="bannerType = bannerTypes[$event]"
        :options="Object.values(bannerTypes)"
        label="Banner type"
        placeholder="Select the banner type"
      />
    </page-header>
    <page-box>
      <banners-table :banner-type="bannerType" @set-banner-type="bannerType = $event" />
    </page-box>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Banners',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    BannersTable: () => import('@/containers/banners/Table'),
    CustomSelect: () => import('@/components/CustomSelect')
  },

  data () {
    return {
      page: 1,

      bannerType: this.$store.state.banners.bannerTypes.all
    }
  },

  computed: {
    ...mapState('banners', ['bannerTypes'])
  }
}
</script>
