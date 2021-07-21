<template>
  <section class="page-box" :class="{'page-box--double': double}">
    <h1 v-if="title" class="page-box__title">
      {{ title }}
    </h1>
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
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/page-box';
</style>
