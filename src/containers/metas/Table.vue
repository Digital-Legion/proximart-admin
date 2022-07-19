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
        label="Name RU"
        prop="meta_title"
      />
      <el-table-column
        label="Name AZ"
        prop="meta_title__az"
      />
      <el-table-column
        label="Page type"
        prop="page_type"
      />
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <a :href="`/metas/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
              <font-awesome-icon icon="edit" />
            </a>
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
    await this.fetchMetas({
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
    ...mapState('meta', ['metas', 'limit']),

    tableData () {
      return this.metas?.items ?? []
    },

    parentId () {
      return this.$route.query.id ?? null
    },

    total () {
      return parseInt(this.metas?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('meta', ['fetchMetas']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchMetas({
        page: this.page
      })
      this.loading = false
    }, 200)
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>
