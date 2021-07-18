<template>
  <div class="custom-cascader">
    <span class="g-label" v-if="label">{{ label }}</span>
    <el-cascader
      :value="value"
      @change="onChange"
      :options="options"
      clearable
      :props="{ label: 'name', value: 'id', checkStrictly: true, multiple: false }"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomCascader',

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select one'
    },
    label: {
      type: String
    }
  },

  methods: {
    onChange (e) {
      this.$emit('set-value', e?.[e?.length - 1] ?? null)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-cascader';
</style>
