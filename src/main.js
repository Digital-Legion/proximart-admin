// default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import './assets/styles/app.scss'
import './assets/styles/common.scss'

// plugins/modules
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCopyright, faPlus, faSave, faBan, faEdit, faTrash, faSitemap, faCubes, faBold, faPalette, faUserCircle, faEye, faEyeSlash, faPager, faClipboardList, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faCuttlefish, faProductHunt, faDochub } from '@fortawesome/free-brands-svg-icons'
import PhoneMaskInput from 'vue-phone-mask-input'
import TextareaAutosize from 'vue-textarea-autosize'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Toasted from 'vue-toasted'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueLoading from 'vue-loading-overlay'

library.add(faCopyright, faPlus, faSave, faBan, faEdit, faTrash, faSitemap, faCubes, faCuttlefish, faBold, faPalette, faUserCircle, faProductHunt, faClipboardList, faUserFriends, faEye, faEyeSlash, faDochub, faPager)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('phone-mask-input', PhoneMaskInput)
Vue.component('loading', VueLoading)
Vue.use(VueLoading)
Vue.use(TextareaAutosize)
Vue.use(Element, { locale })
Vue.use(Toasted, {
  position: 'top-center',
  duration: 5000
})

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

// add auth token in request
axios.interceptors.request.use(function (config) {
  // Do something before request is sent, like we're inserting a timeout for only requests with a particular baseURL
  const token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// handle no token error in response
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.config.url === '/auth/profile' && error.message === 'Request failed with status code 401') {
    localStorage.removeItem('token')
    router.push('/auth').catch(() => {})
    return error
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
