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
        label="Client"
        prop="name"
      />
      <el-table-column
        label="Total"
      >
        <template slot-scope="props">
          {{ props.row.total }} AZN
        </template>
      </el-table-column>
      <el-table-column
        label="Payment Method"
      >
        <template slot-scope="props">
          {{ props.row.by_with === 'card' ? 'Card' : (props.row.by_with === 'cash' ? 'Cash' : 'NOT IDENTIFIED') }}
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
      >
        <template slot-scope="props">
          {{ props.row.order_type === 'order' ? 'Order'
            :
            (props.row.order_type === 'pre-order' ? 'Preorder'
            :
            (props.row.order_type === 'buy_in_one_click' ? 'Buy in one click'
            :
            'NOT IDENTIFIED'
            ))
          }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <a :href="`/orders/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
              <font-awesome-icon icon="edit" />
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
    await this.fetchOrders({
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
    ...mapState('orders', ['orders', 'limit']),

    tableData () {
      return this.orders?.items?.[0]?.children ?? (this.orders?.items ?? [])
    },

    total () {
      return parseInt(this.orders?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('orders', ['fetchOrders', 'removeOrder']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchOrders({
        page: this.page
      })
      this.loading = false
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the order. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeOrder(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Order with id ${id} was removed`
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
