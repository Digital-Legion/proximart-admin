<template>
  <div class="g-text-editor">
    <Label v-if="label">
      {{ label }}
    </Label>
    <editor
      :value="value"
      @input="$emit('input', $event)"
      :api-key="apiKey"
      :init="{
        menubar: false,
        statusbar: false,
        automatic_uploads: true,
        file_picker_types: 'image',
        plugins: 'link paste autolink image media autoresize',
        paste_as_text: true,
        default_link_target: '_blank',
        content_css: '/mce-style.css',
        smart_paste: false,
        file_picker_callback: this.filePickerCallback,
      }"
      toolbar="bold italic underline strikethrough link image"
      block_formats="Paragraph=p; Header 2=h2; Header 3=h3"
      :resize="false"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'

export default {
  name: 'Editor',

  components: {
    editor: Editor,
    Label: () => import('@/components/Label')
  },

  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    }
  },

  computed: {
    apiKey () {
      return process.env.VUE_APP_TINY_API_KEY || 'no-api-key'
    }
  },

  methods: {
    filePickerCallback (cb) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')

      input.onchange = async () => {
        if (input.files[0]) {
          const formData = new FormData()
          formData.append('file', input.files[0])
          await axios.post('/upload', formData)
            .then(res => {
              cb(res.data.secure_url)
            })
            .catch(e => {
              this.$toasted.error(e?.response?.message ||
                e?.response?.error ||
                'Не получилось загрузить, обратитесь к администратору')
            })
        }
      }
      input.click()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/text-editor';
</style>
