import Vue from 'vue'
import Vuex from 'vuex'

import categories from '@/store/categories'
import parameters from '@/store/parameters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    parameters
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
