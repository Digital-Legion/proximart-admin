<template>
  <div class="custom-multi-input">
    <div class="g-flex mb-20" v-for="(input, index) in inputValues" :key="index">
      <custom-input
        class="mr-20"
        :value="input"
        @input="onInput(index, $event)"
        :placeholder="placeholder"
      />
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
export default {
  name: 'CustomMultiInput',

  components: {
    CustomInput: () => import('@/components/CustomInput')
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Enter a value'
    }
  },

  computed: {
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
    onInput (inputIndex, inputValue) {
      const inputs = Object.assign({}, this.inputs)
      inputs[inputIndex.toString()] = inputValue
      this.$emit('input', Object.values(inputs))
    },

    onRemove (inputIndex) {
      const inputs = Object.assign({}, this.inputs)
      delete inputs[inputIndex.toString()]
      this.$emit('input', Object.values(inputs))
    },

    addInput () {
      const inputs = this.inputValues.slice()
      inputs.push('')
      this.$emit('input', inputs)
    }
  }
}
</script>

<style scoped>

</style>
