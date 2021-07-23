<template>
  <div class="flip-card" :class="{'flip-card--flipped': flipped}">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <slot name="front" />
      </div>
      <div class="flip-card-back">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipCard',

  props: {
    flipped: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/flip-card';
</style>
