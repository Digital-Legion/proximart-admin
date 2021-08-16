<template>
  <div class="custom-checkbox">
    <el-checkbox
      :value="value"
      @input="$emit('input', $event)"
    >
      {{ label }}
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Label here'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-checkbox';
</style>
