<template>
  <ul class="the-filters">
    <li v-for="(filter) in parsedFilters" :key="filter.key" class="the-filters__item">
      <span class="the-filters__item-name">{{ filter.name }}</span>
      <el-select
        :value="filter.value"
        @input="onUpdate($event, filter)"
        :clearable="filter.clearable || false"
        placeholder="Select"
        v-if="filter.type === 'select'"
      >
        <el-option
          v-for="item in filter.options"
          :key="item.value || item"
          :label="item.name || item.label || item"
          :value="item.value || item">
        </el-option>
      </el-select>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Filters',

  props: {
    filters: {
      type: Object,
      required: true
    },
    filtersPrototype: {
      type: Object,
      required: true
    }
  },

  computed: {
    parsedFilters () {
      return Object.entries(this.filters || {})
        .map(([key, value]) => ({ key, value, ...(this.filtersPrototype?.[key] || {}) }))
    }
  },

  methods: {
    onUpdate (value, filter) {
      if (filter.type === 'select') {
        this.$emit('update', {
          ...filter,
          value
        })
      } else {
        console.warn('WARNING: No update is available for this type of filter')
      }
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/elements/filters.scss"></style>
