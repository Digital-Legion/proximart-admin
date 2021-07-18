<template>
  <div class="page-tabs">
    <ul>
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{active: value === item.slug || value === item.id, error: item.error}"
        @click="selectTab(item.slug || item.id)"
      >
        {{ item.title ? item.title :
          (item.label ? item.label :
            (item.name ? item.name :
              (item.slug ? item.slug :
                (item.id ? item.id : '')))) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PageTabs',

  props: {
    value: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    selectTab (itemIdentifier) {
      this.$emit('input', itemIdentifier)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/page-tabs';
</style>
