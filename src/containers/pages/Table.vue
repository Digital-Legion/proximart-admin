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
    >
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="Title RU"
        prop="title"
      />
      <el-table-column
        label="Title AZ"
        prop="title__az"
      />
      <el-table-column
        label="Slug RU"
        prop="slug"
      />
      <el-table-column
        label="Slug AZ"
        prop="slug__az"
      />
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <a :href="`/pages/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
              <font-awesome-icon icon="edit" />
            </a>
            <button class="g-button g-button--danger g-table__actions-item" v-if="props.row.slug !== 'o-nas'" @click="onRemove(props.row.id)">
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
    await this.fetchPages({
      page: this.page
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
    ...mapState('page', ['pages', 'limit']),

    tableData () {
      return this.pages?.items ?? []
    },

    total () {
      return parseInt(this.pages?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('page', ['fetchPages', 'removePage']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchPages({
        page: this.page
      })
      this.loading = false
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the page. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        if (!this.loading) {
          this.loading = true
          await this.removePage(id)
            .then(async () => {
              this.$message({
                type: 'success',
                message: `Page with id ${id} was removed`
              })
              if (this.page !== 1) this.page = 1
              else {
                this.loading = true
                await this.fetchPages({
                  page: this.page
                })
                this.loading = false
              }
            })
            .catch(e => {
              console.error(e)
              this.$message({
                type: 'error',
                message: e.response.data.message
              })
            })
          this.loading = false
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>
