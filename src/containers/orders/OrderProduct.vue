<template>
  <div class="order-product">
    <div class="order-product__content">
      <div class="order-product__image">
        <img v-if="image" :src="image.url" :alt="image.alt">
      </div>
      <div class="order-product__info">
        <div class="order-product__info-item" v-if="product && product.product && product.product.name">
          {{ product.product.name }}
        </div>
        <div class="order-product__info-item" v-if="product && product.original_price">
          Original price: {{ product.original_price }} AZN
        </div>
        <div class="order-product__info-item" v-if="product && product.price">
          Price: {{ product.price }} AZN
        </div>
        <div class="order-product__info-item" v-if="product && product.discount">
          Discount: {{ product.discount }}%
        </div>
        <div class="order-product__info-item" v-if="product && product.color_title">
          Color: {{ product.color_title }}
        </div>
        <div class="order-product__info-item" v-if="product && product.devices">
          Variant: {{ product.devices }}
        </div>
        <div class="order-product__info-item" v-if="product && product.count">
          Count: {{ product.count }}
        </div>
        <div class="order-product__info-item" v-if="product && product.product && product.product.slug">
          <a :href="`https://proximart.az/product/${product.product.slug}`" target="_blank">Website link</a>
          <a :href="`https://api.proximart.az/products/${product.product.id}`" target="_blank">Admin link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderProduct',

  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    image () {
      return this.product?.product?.colors?.[0]?.images?.[0]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/order-product';
</style>
