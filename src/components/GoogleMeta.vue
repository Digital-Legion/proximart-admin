<template>
  <div class="w-100">
    <span class="g-label">Google</span>
    <div class="meta-card google-meta">
      <a :href="url" target="_blank" class="google-meta__title">{{ title }}</a>
      <span class="google-meta__url">{{ url }}</span>
      <p class="google-meta__description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMeta',

  props: {
    title: {
      type: String,
      default: 'Google Meta — PROXIMART'
    },
    url: {
      type: String,
      default: 'https://google.com/'
    },
    description: {
      type: String,
      default: 'This is how it\'s going to look like'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/meta-card';
@import '@/assets/styles/elements/google-meta';
</style>
