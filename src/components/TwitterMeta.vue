<template>
  <div>
    <span class="g-label">Twitter</span>
    <a :href="url" target="_blank" class="meta-card twitter-meta">
      <img :src="image" :alt="title">
      <div class="twitter-meta__bottom">
        <span class="twitter-meta__title">{{ title }}</span>
        <p class="twitter-meta__description">{{ description }}</p>
        <span class="twitter-meta__url">{{ clearedUrl(url) }}</span>
      </div>
    </a>
  </div>
</template>

<script>
import clearedUrl from '@/mixins/clearedUrl'

export default {
  name: 'TwitterMeta',

  mixins: [
    clearedUrl
  ],

  props: {
    title: {
      type: String,
      default: 'Twitter Meta — PROXIMART'
    },
    url: {
      type: String,
      default: 'https://twitter.com/'
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
@import '@/assets/styles/elements/twitter-meta';
</style>
