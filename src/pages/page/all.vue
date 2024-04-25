<template>
  <div class="pages-page">
    <page-header title="Pages">
      <router-link class="g-button g-button--icon" to="/pages/add">
        <font-awesome-icon icon="plus" />
      </router-link>
    </page-header>
    <page-box>
      <page-table />
    </page-box>
  </div>
</template>

<script>
import 'vue-json-pretty/lib/styles.css'

export default {
  name: 'Pages',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    PageTable: () => import('@/containers/pages/Table')
  }
}
</script>

<style lang="scss" src="@/assets/styles/pages/categories.scss"></style>
