import Vue from 'vue'
import Vuex from 'vuex'

import categories from '@/store/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories
  },

  state: {
    defaultActiveLang: 'ru',
    activeLang: 'ru',
    langs: [
      {
        slug: 'ru',
        title: 'RU'
      },
      {
        slug: 'az',
        title: 'AZ'
      }
    ]
  },

  mutations: {
    setActiveLang (state, payload) {
      state.activeLang = payload
    }
  },

  actions: {
  }
})
