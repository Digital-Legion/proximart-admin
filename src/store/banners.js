import axios from 'axios'

export default {
  namespaced: true,

  state: {
    banners: null,
    limit: 10,

    bannerTypes: {
      all: {
        name: 'All',
        id: 'all'
      },
      large: {
        name: 'Large',
        id: 'large',
        value: true
      },
      small: {
        name: 'Small',
        id: 'small',
        value: false
      }
    }
  },

  mutations: {
    setBanners (state, payload) {
      state.banners = payload
      state.banners.items.push({})
      state.banners.items.pop()
    },

    removeBannerById (state, id) {
      const brandIndex = state.banners.items.findIndex(c => c.id === id)
      if (brandIndex !== -1) {
        state.banners.items.splice(brandIndex, 1)
        state.banners.meta.totalItems--
      }
    }
  },

  actions: {
    fetchBanners ({ commit, state }, { page, bannerType }) {
      axios.get(`/banner?page=${page}&limit=${state.limit}${bannerType ? `&big_banner=${bannerType}` : ''}`)
        .then(res => {
          commit('setBanners', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchBanner (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/banner/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    createBanner (_, data) {
      const formData = new FormData()
      Object.entries(data).forEach(entry => {
        formData.append(entry[0], entry[1])
      })
      return new Promise((resolve, reject) => {
        axios.post('/banner', formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateBanner (_, data) {
      const formData = new FormData()
      Object.entries(data).forEach(entry => {
        formData.append(entry[0], entry[1])
      })
      return new Promise((resolve, reject) => {
        axios.put(`/banner/${data.id}`, formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeBanner ({ commit }, { id, removeInBanners = true }) {
      return new Promise((resolve, reject) => {
        axios.delete(`/banner/${id}`)
          .then(() => {
            if (removeInBanners)
              commit('removeBannerById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
