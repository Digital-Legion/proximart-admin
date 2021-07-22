<template>
  <div class="drop-image">
    <span class="g-label" v-if="label">{{ label }}</span>
    <div class="drop-image--no-image" v-if="!image" @click.stop="$refs.dropImage.click()">
      <button class="drop-image__upload">
        {{ placeholder }}
      </button>
    </div>
    <div class="drop-image--dropped" v-else>
      <img :src="image" alt="dropped-image" class="drop-image__img">
      <button class="drop-image__remove" @click="removeFile">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.688 4H22V.687a.694.694 0 00-.688-.688H10.687a.694.694 0 00-.688.688V4H1.311c-.375 0-.625.313-.625.688s.25.625.625.625h3.375v26c0 .375.25.688.625.688h21.375c.375 0 .625-.313.625-.688v-26h3.375c.375 0 .625-.25.625-.625S31.061 4 30.686 4zM11.313 1.313h9.375v2.688h-9.375zM26 30.688H6V5.313h20zM10.688 9.313a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.625-.313.625-.688V10.001c0-.375-.25-.688-.625-.688zm5.312 0a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.688-.313.688-.688V10.001A.694.694 0 0016 9.313zm4.688.687v15.313c0 .375.25.688.625.688s.688-.313.688-.688V10c0-.375-.313-.688-.688-.688s-.625.313-.625.688z"/>
        </svg>
      </button>
    </div>
    <input type="file" v-show="false" accept="image/*" ref="dropImage" @change="onChange">
  </div>
</template>

<script>
export default {
  name: 'DropImage',

  props: {
    label: {
      type: String,
      default: 'Image'
    },
    placeholder: {
      type: String,
      default: 'Upload'
    },
    imgSrc: {
      type: String
    }
  },

  data () {
    return {
      image: null
    }
  },

  watch: {
    imgSrc: {
      immediate: true,
      handler () {
        this.image = this.imgSrc
      }
    }
  },

  methods: {
    removeFile () {
      this.image = null
      this.$emit('set', { file: '', src: '' })
      this.$emit('set-image', '')
      this.$emit('set-image-src', '')
    },

    onChange (e) {
      const file = e.target.files[0]
      if (file) {
        this.image = URL.createObjectURL(file)
        this.$emit('set', { file, src: this.image })
        this.$emit('set-image', file)
        this.$emit('set-image-src', this.image)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/drop-image.scss';
</style>
