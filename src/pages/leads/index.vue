<template>
  <div class="parameters-page">
    <page-header title="Leads" />
    <page-box>
      <leads-table />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Banners',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    LeadsTable: () => import('@/containers/leads/Table')
  },

  data () {
    return {
      page: 1
    }
  }
}
</script>
