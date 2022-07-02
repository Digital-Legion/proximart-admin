<template>
  <div class="custom-multi-input">
    <div class="g-flex g-flex--ai-fe mb-20" v-for="(input, index) in inputValues" :key="index">
      <template v-for="(vt, i) in valueTemplate">
        <custom-input
          :key="`${vt.prop}-${i}`"
          class="mr-20"
          :value="input[vt.prop]"
          :name="vt.name"
          @input="onInput(index, vt.prop, $event)"
          :placeholder="vt.placeholder"
          :label="index === 0 ? vt.label : null"
          v-if="activeLang === 'ru' || vt.isAllLang"
        />
        <custom-input
          :key="`${vt.prop}-${i}-az`"
          class="mr-20"
          :value="input[`${vt.prop}__az`]"
          @input="onInput(index, `${vt.prop}__az`, $event)"
          :placeholder="vt.placeholder"
          :label="index === 0 ? vt.label : null"
          v-else-if="activeLang === 'az'"
        />
      </template>
      <button class="g-button g-button--icon g-button--danger" @click="onRemove(index)">
        <font-awesome-icon icon="trash"/>
      </button>
    </div>
    <button class="g-button g-button--icon" @click="addInput">
      <font-awesome-icon icon="plus"/>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomMultiInput',

  components: {
    CustomInput: () => import('@/components/CustomInput')
  },

  props: {
    value: {
      type: Array
    },
    valueTemplate: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapState(['activeLang']),

    inputs () {
      const inputs = {}
      if (this.value) {
        this.value.forEach((v, i) => {
          inputs[i.toString()] = v
        })
      }
      return inputs
    },

    inputValues () {
      return this.inputs && this.inputs !== {} ? Object.values(this.inputs) : []
    }
  },

  methods: {
    onInput (inputIndex, inputProp, inputValue) {
      const inputs = Object.assign({}, this.inputs)
      inputs[inputIndex.toString()][inputProp] = inputValue
      this.$emit('input', Object.values(inputs))
    },

    onRemove (inputIndex) {
      const inputs = Object.assign({}, this.inputs)
      delete inputs[inputIndex.toString()]
      this.$emit('input', Object.values(inputs))
    },

    addInput () {
      const inputs = this.inputValues.slice()
      inputs.push({})
      this.$emit('input', inputs)
    }
  }
}
</script>
