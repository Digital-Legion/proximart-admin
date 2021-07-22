<template>
  <section class="page-box" :class="{'page-box--double': double}">
    <h1 v-if="title" class="g-title">
      {{ title }}
      <span class="small" v-if="sideTitle">
        {{ sideTitle }}
      </span>
    </h1>
    <slot name="outer-content" />
    <div class="page-box__content">
      <slot />
    </div>
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
    },
    sideTitle: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/page-box';
</style>
