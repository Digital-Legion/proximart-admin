<template>
  <div class="categories-page">
    <page-header title="Metas" />
    <page-box>
      <meta-table />
    </page-box>
  </div>
</template>

<script>
import 'vue-json-pretty/lib/styles.css'

export default {
  name: 'Categories',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    MetaTable: () => import('@/containers/metas/Table')
  }
}
</script>

<style lang="scss" src="@/assets/styles/pages/categories.scss"></style>
