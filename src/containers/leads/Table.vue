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
        width="75px"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column
        label="Email"
        prop="email"
      />
      <el-table-column
        label="Date"
      >
        <template slot-scope="props">
          {{ formatDate(props.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="75px">
        <template slot-scope="props">
          <div class="g-table__actions">
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
import moment from 'moment'

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
    await this.fetchLeads({
      page: this.page
    })
    this.loading = false
  },

  watch: {
    page () {
      this.debounceFetch()
    }
  },

  computed: {
    ...mapState('leads', ['leads', 'limit']),

    tableData () {
      return this.leads?.items?.[0]?.children ?? (this.leads?.items ?? [])
    },

    total () {
      return parseInt(this.leads?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('leads', ['fetchLeads', 'removeLead']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchLeads({
        page: this.page
      })
      this.loading = false
    }, 200),

    formatDate (date) {
      return moment(date).format('HH:mm DD MMM YYYY')
    },

    onRemove (id) {
      this.$confirm('This will permanently delete the lead. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeLead(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Lead with id ${id} was removed`
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
