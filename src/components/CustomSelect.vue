<template>
  <div class="custom-select">
    <span class="g-label" v-if="label">{{ label }}</span>
    <el-select
      :value="value"
      @change="onChange"
      :multiple="multiple"
      collapse-tags
      :placeholder="placeholder"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',

  props: {
    value: {
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select one'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChange (e) {
      this.$emit('set-value', e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-select';
</style>
