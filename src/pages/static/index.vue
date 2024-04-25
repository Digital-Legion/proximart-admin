<template>
  <div class="static-page">
    <page-header title="Static" />
    <page-box title="Upload">
      <button class="g-button static-page__upload-btn" :disabled="loading" @click="$refs.fileInput.click()">
        Click to upload
      </button>
      <vue-json-pretty :data="lastUploadResponse" class="static-page__json" />
      <input type="file" v-show="false" ref="fileInput" @change="onChange">
    </page-box>
  </div>
</template>

<script>
import axios from 'axios'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  name: 'StaticPage',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    VueJsonPretty
  },

  data () {
    return {
      lastUploadResponse: {},
      loading: false
    }
  },

  methods: {
    async onChange (e) {
      const file = e.target.files[0]
      if (file) {
        this.loading = true
        const formData = new FormData()
        formData.append('file', file)
        await axios.post('/upload', formData)
          .then(res => {
            this.$set(this, 'lastUploadResponse', res.data)
          })
          .catch(e => {
            this.$toasted.error(e?.response?.message ||
              e?.response?.error ||
              'Не получилось загрузить, обратитесь к администратору')
          })
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/pages/static.scss"></style>
