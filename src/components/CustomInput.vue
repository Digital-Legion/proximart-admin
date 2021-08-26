<template>
  <div class="custom-input">
    <span class="g-label" v-if="label">{{ label }}</span>
    <div class="custom-input__input-wrapper">
      <textarea-autosize v-if="isTextarea" :rows="1" :max-rows="5" class="custom-input__input custom-input__input--textarea" :value="value"
                         @input="onInput" :placeholder="placeholder"/>
      <phone-mask-input v-else-if="isPhone" :value="value" @input="onInput" :placeholder="placeholder"
                        @onValidate="$emit('set-phone-valid', $event.isValidByLibPhoneNumberJs)" :show-flag="true"/>
      <input v-else :type="filteredType" :readonly="readonly" class="custom-input__input" :class="{'custom-input__input--password': type === 'password'}" :value="value" @input="onInput"
             :placeholder="placeholder">
      <svg class="custom-input__password-eye" @click="$emit('toggle-password')" v-if="type === 'password'" width="16" height="16" viewBox="0 0 16 16"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 7.99992C10 9.10259 9.10267 9.99992 8 9.99992C6.89733 9.99992 6 9.10259 6 7.99992C6 6.89725 6.89733 5.99992 8 5.99992C9.10267 5.99992 10 6.89725 10 7.99992ZM16 7.70059C16 7.70059 13.1653 12.6666 8.01 12.6666C3.22333 12.6666 0 7.70059 0 7.70059C0 7.70059 2.964 3.33325 8.01 3.33325C13.1393 3.33325 16 7.70059 16 7.70059ZM11.3333 7.99992C11.3333 6.15925 9.84133 4.66659 8 4.66659C6.15933 4.66659 4.66667 6.15925 4.66667 7.99992C4.66667 9.84125 6.15933 11.3333 8 11.3333C9.84133 11.3333 11.3333 9.84125 11.3333 7.99992Z"
          fill="#8E8F8F"/>
      </svg>
    </div>
    <div v-if="showCharacterCount" class="custom-input__character-count">
      <span class="current">{{ value.length }}</span>
      <template v-if="maxCharacters">
        <span>/</span>
        <span class="max">{{ maxCharacters }}</span>
      </template>
    </div>
    <div class="g-error" v-if="error"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',

  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    isTextarea: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    isPhone: {
      type: Boolean,
      default: false
    },
    showCharacterCount: {
      type: Boolean,
      default: false
    },
    maxCharacters: {
      type: Number,
      default: 0
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  },

  computed: {
    filteredType () {
      return this.type === 'password' && this.showPassword ? 'text' : this.type
    }
  },

  methods: {
    onInput (e) {
      if (this.isTextarea) {
        this.$emit('input', this.maxCharacters ? e.slice(0, this.maxCharacters) : e)
      } else if (this.isPhone) {
        this.$emit('input', e)
      } else {
        this.$emit('input', this.maxCharacters ? e.target.value.slice(0, this.maxCharacters) : e.target.value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/custom-input';
</style>
