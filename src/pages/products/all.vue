<template>
  <div class="products-page">
    <page-header title="Products">
      <button class="g-button g-button--icon" @click="creatingNew = true">
        <font-awesome-icon icon="plus" />
      </button>
    </page-header>
    <page-box>
      <products-table :creating-new="creatingNew" @set-creating-new="creatingNew = $event" />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Products',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    ProductsTable: () => import('@/containers/products/Table')
  },

  data () {
    return {
      creatingNew: false
    }
  }
}
</script>
