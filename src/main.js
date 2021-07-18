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
import { faBookOpen, faPlus, faSave, faBan, faEdit, faTrash, faSitemap, faCubes } from '@fortawesome/free-solid-svg-icons'
import PhoneMaskInput from 'vue-phone-mask-input'
import TextareaAutosize from 'vue-textarea-autosize'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Toasted from 'vue-toasted'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueLoading from 'vue-loading-overlay'

library.add(faBookOpen, faPlus, faSave, faBan, faEdit, faTrash, faSitemap, faCubes)
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
