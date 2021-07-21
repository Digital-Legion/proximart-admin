<template>
  <div class="colors-page">
    <page-header title="Colors">
      <router-link class="g-button g-button--icon" to="/colors/add">
        <font-awesome-icon icon="plus" />
      </router-link>
    </page-header>
    <page-box>
      <colors-table />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Colors',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    ColorsTable: () => import('@/containers/colors/Table')
  }
}
</script>
