import Vue from 'vue'
import Vuex from 'vuex'

import categories from '@/store/categories'
import brands from '@/store/brands'
import devices from '@/store/devices'
import colors from '@/store/colors'
import banners from '@/store/banners'
import products from '@/store/products'
import parameters from '@/store/parameters'
import orders from '@/store/orders'
import auth from '@/store/auth'
import leads from '@/store/leads'
import meta from '@/store/meta'
import page from '@/store/page'
import settings from '@/store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    brands,
    devices,
    colors,
    banners,
    orders,
    products,
    parameters,
    leads,
    meta,
    page,
    settings,
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
