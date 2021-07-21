<template>
  <div class="custom-color-picker">
    <span class="g-label" v-if="label">{{ label }}</span>
    <el-color-picker
      :value="value"
      @change="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomColorPicker',

  props: {
    label: {
      type: String
    },
    value: {
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-color-picker';
</style>
