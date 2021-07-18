<template>
  <div class="g-table">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      @expand-change="onExpandChange"
    >
      <el-table-column type="expand" v-if="level < 3 && tableData.children !== 'to-be-checked' && tableData.children !== []">
        <template slot-scope="props" v-if="props.row.children !== 'to-be-checked' && props.row.children !== []">
          <categories-table :level="level+1" :props-table-data="props.row.children" />
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Table',

  components: {
    CategoriesTable: () => import('@/containers/categories/Table')
  },

  props: {
    propsTableData: {
      type: Array,
      default: null
    },
    level: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      loading: false,
      page: 1
    }
  },

  async created () {
    if (this.level === 1) {
      await this.fetchCategories({
        page: this.page
      })
    }
  },

  computed: {
    ...mapState('categories', ['categories']),

    tableData () {
      return this.level === 1 ? (this.categories?.items ?? []) : (this.propsTableData ?? [])
    }
  },

  methods: {
    ...mapActions('categories', ['fetchCategories']),

    onExpandChange (row, expanded) {
      if (expanded.length) {
        this.fetchCategories({ page: 1, parentId: row.id })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>
