<template>
  <div class="custom-select" :class="{'custom-select--round' : round, 'custom-select--active': active}">
    <span class="g-label" v-if="label">{{ label }}</span>
    <el-select
      :value="value"
      @change="onChange"
      :multiple="multiple"
      collapse-tags
      :placeholder="round ? (active ? placeholder : '') : placeholder"
      @focus="active = true"
      @blur="active = false"
    >
      <template v-if="!round">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </template>
      <template v-else>
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          class="custom-select__color-item"
        >
          <div class="custom-select__color" :style="{ background: `#${item.hex}` }" />
          <span class="custom-select__label">#{{ item.hex }} | {{ item.name }}</span>
          <span class="custom-select__label custom-select__label--right">{{ item.id }}</span>
        </el-option>
      </template>
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
    },
    round: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      active: false
    }
  },

  methods: {
    onChange (e) {
      this.$emit('set-value', e)
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-select';
</style>
