<template>
  <div class="brands-page">
    <page-header title="Brands">
      <router-link class="g-button g-button--icon" to="/brands/add">
        <font-awesome-icon icon="plus" />
      </router-link>
    </page-header>
    <page-box>
      <brands-table />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Brands',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    BrandsTable: () => import('@/containers/brands/Table')
  }
}
</script>
