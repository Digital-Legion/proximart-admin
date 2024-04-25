<template>
  <div class="categories-page">
    <page-header title="Categories">
      <router-link class="g-button g-button--icon" to="/categories/add">
        <font-awesome-icon icon="plus" />
      </router-link>
      <el-popover
        placement="top-end"
        title="Categories JSON"
        width="500"
        trigger="click">
        <button slot="reference" class="g-button g-button--icon">
          <font-awesome-icon icon="sitemap" />
        </button>

        <p class="categories-page__json-text">Click on [id, name, name__az, slug] to change the current category to the clicked one</p>
        <vue-json-pretty v-if="cascaderCategories" :data="cascaderCategories" class="categories-page__json" @click="onClickJson" />
      </el-popover>
    </page-header>
    <page-box>
      <categories-table />
    </page-box>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const extractFromJsonByString = (object, path, defaultValue) => path
  .split(/[.[\]'"]/)
  .filter(p => p)
  .reduce((o, p) => o ? o[p] : defaultValue, object)

export default {
  name: 'Categories',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    CategoriesTable: () => import('@/containers/categories/Table'),
    VueJsonPretty
  },

  created () {
    this.fetchCascaderCategories()
  },

  computed: {
    ...mapState({
      cascaderCategories: state => state.categories.cascaderCategories
    })
  },

  methods: {
    ...mapActions({
      fetchCascaderCategories: 'categories/fetchCascaderCategories'
    }),

    onClickJson (stringPath) {
      stringPath = stringPath.split('.')
      const clickedKey = stringPath[stringPath.length - 1]
      stringPath = stringPath.slice(0, stringPath.length - 1).join('.').replace('root', '')
      if (['id', 'name', 'name__az', 'slug'].includes(clickedKey)) {
        const clickedObj = extractFromJsonByString(this.cascaderCategories, stringPath)
        if (clickedObj?.id) {
          this.$router.push({
            path: '/categories',
            query: {
              id: clickedObj.id
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/pages/categories.scss"></style>
