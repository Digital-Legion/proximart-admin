<template>
  <header class="page-header">
    <h1 class="g-title" v-if="title">{{ title }}</h1>
    <slot name="content" />
    <div class="page-header__actions">
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',

  props: ['title']
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/page-header';
</style>
