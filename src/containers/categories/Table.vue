<template>
  <div class="g-table">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="false"
    />
<!--    TODO ADD CASCADER HERE or TREE CHART or TREE SELECT -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <router-link :to="{
                name: 'categories',
                query: {
                  id: props.row.id
                }
              }" class="g-button g-table__actions-item">
              <font-awesome-icon icon="sitemap" />
            </router-link>
            <a :href="`/categories/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
              <font-awesome-icon icon="edit" />
            </a>
            <a :href="`/parameters/${props.row.id}`" target="_blank" class="g-button g-table__actions-item">
              <font-awesome-icon icon="cubes" />
            </a>
            <button class="g-button g-button--danger g-table__actions-item" @click="onRemove(props.row.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="page" :total-elems="total" :per-page="limit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { debounce } from '@/utils/debounce'

export default {
  name: 'Table',

  components: {
    Pagination: () => import('@/components/Pagination')
  },

  data () {
    return {
      loading: false,
      page: 1
    }
  },

  async created () {
    this.loading = true
    await this.fetchCategories({
      page: this.page,
      parentId: this.parentId?.toString()
    })
    this.loading = false
  },

  watch: {
    parentId () {
      this.page = 1
      this.debounceFetch()
    },

    page () {
      this.debounceFetch()
    }
  },

  computed: {
    ...mapState('categories', ['categories', 'limit']),

    tableData () {
      return this.categories?.items?.[0]?.children ?? (this.categories?.items ?? [])
    },

    parentId () {
      return this.$route.query.id ?? null
    },

    total () {
      return parseInt(this.categories?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('categories', ['fetchCategories', 'removeCategory']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchCategories({
        page: this.page,
        parentId: this.parentId?.toString()
      })
      this.loading = false
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the category. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeCategory(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Category with id ${id} was removed`
            })
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
          })
        this.loading = false
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>
