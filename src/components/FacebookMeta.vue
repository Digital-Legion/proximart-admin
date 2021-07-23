<template>
  <div>
    <span class="g-label">Facebook</span>
    <a :href="url" target="_blank" class="meta-card facebook-meta">
      <img :src="image" :alt="title">
      <div class="facebook-meta__bottom">
        <span class="facebook-meta__url">{{ clearedUrl(url) }}</span>
        <span class="facebook-meta__title">{{ title }}</span>
        <p class="facebook-meta__description">{{ description }}</p>
      </div>
    </a>
  </div>
</template>

<script>
import clearedUrl from '@/mixins/clearedUrl'

export default {
  name: 'FacebookMeta',

  mixins: [
    clearedUrl
  ],

  props: {
    title: {
      type: String,
      default: 'Facebook Meta — PROXIMART'
    },
    url: {
      type: String,
      default: 'https://facebook.com/'
    },
    image: {
      type: String,
      default: 'https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png'
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
@import '@/assets/styles/elements/facebook-meta';
</style>
