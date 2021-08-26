<template>
  <div class="orders-page">
    <page-header title="Orders" />
    <page-box>
      <orders-table />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Orders',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    OrdersTable: () => import('@/containers/orders/Table')
  }
}
</script>
