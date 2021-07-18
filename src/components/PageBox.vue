<template>
  <section class="page-box" :class="{'page-box--double': double}">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'PageBox',

  props: {
    double: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/page-box';
</style>
