<template>
  <div class="add-edit-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <page-header :title="pageTitle">
      <button class="g-button g-button--danger" @click="onRemove" :disabled="wait">
        <font-awesome-icon icon="trash" />
        <span>Remove</span>
      </button>
    </page-header>
    <page-box :double="true" v-if="order">
      <div class="add-edit-page__left">
        <custom-input
          v-if="order.name"
          :value="order.name"
          class="mb-20"
          label="Client"
          :readonly="true"
        />
        <custom-input
          v-if="order.phone"
          :value="order.phone"
          class="mb-20"
          label="Phone"
          :readonly="true"
        />
        <custom-input
          v-if="order.address"
          :value="order.address"
          class="mb-20"
          label="Address"
          :readonly="true"
        />
        <custom-input
          v-if="order.entrance"
          :value="order.entrance"
          class="mb-20"
          label="Entrance"
          :readonly="true"
        />
      </div>
      <div class="add-edit-page__right">
        <custom-input
          v-if="orderType"
          :value="orderType"
          placeholder="Order Type"
          class="mb-20"
          label="Order type"
          :readonly="true"
        />
        <custom-input
          v-if="paymentMethod"
          :value="paymentMethod"
          class="mb-20"
          label="Payment Method"
          :readonly="true"
        />
        <custom-input
          v-if="order.total"
          :value="order.total + ' AZN'"
          class="mb-20"
          label="Total"
          :readonly="true"
        />
        <custom-input
          v-if="order.floor"
          :value="order.floor"
          class="mb-20"
          label="Floor"
          :readonly="true"
        />
      </div>

      <template v-slot:bottom-content>
        <div class="order-product-list">
          <OrderProduct v-for="product in order.products" :product="product" :key="product.id" />
        </div>
      </template>
    </page-box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Order',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput'),
    OrderProduct: () => import('@/containers/orders/OrderProduct')
  },

  data () {
    return {
      order: null,
      loading: false,
      wait: false
    }
  },

  async mounted () {
    this.loading = true
    await this.fetchOrder(this.orderId)
      .then(res => {
        this.order = res.data
      })
      .catch(e => {
        console.error(e)
        this.$toasted.error(e.response.data.message)
      })
    this.loading = false
  },

  computed: {
    orderId () {
      return this.$route.params.id
    },

    pageTitle () {
      return `Order #${this.orderId}`
    },

    orderType () {
      let orderType

      if (this.order?.order_type === 'order') orderType = 'Order'
      else if (this.order?.order_type === 'pre-order') orderType = 'Preorder'
      else if (this.order?.order_type === 'buy_in_one_click') orderType = 'Buy in one click'

      return orderType
    },

    paymentMethod () {
      let paymentMethod

      if (this.order?.by_with === 'card') paymentMethod = 'Card'
      else if (this.order?.by_with === 'cash') paymentMethod = 'Cash'

      return paymentMethod
    }
  },

  methods: {
    ...mapActions('orders', ['fetchOrder', 'removeOrder']),

    onRemove () {
      this.$confirm('This will permanently delete the order. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.wait = true
        await this.removeOrder(this.orderId)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Order with id ${this.orderId} was removed`
            })
            // eslint-disable-next-line
            this.$router.push('/orders')?.catch(() => {})
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
          })
        this.wait = false
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/add-edit.scss';
</style>
