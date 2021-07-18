<template>
  <div class="categories-page">
    <page-header title="Categories">
      <router-link class="g-button g-button--icon" to="/categories/add">
        <font-awesome-icon icon="plus" />
      </router-link>
    </page-header>
    <page-box>
      <categories-table />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Categories',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    CategoriesTable: () => import('@/containers/categories/Table')
  }
}
</script>
