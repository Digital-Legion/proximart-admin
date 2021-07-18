// default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import './assets/styles/app.scss'

// plugins/modules
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
