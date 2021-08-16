import Vue from 'vue'
import Vuex from 'vuex'

import categories from '@/store/categories'
import brands from '@/store/brands'
import devices from '@/store/devices'
import colors from '@/store/colors'
import banners from '@/store/banners'
import products from '@/store/products'
import parameters from '@/store/parameters'
import auth from '@/store/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    brands,
    devices,
    colors,
    banners,
    products,
    parameters,
    auth
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
