import axios from 'axios'

export default {
  namespaced: true,

  state: {
    brands: null,
    allCategories: [],
    limit: 12
  },

  mutations: {
    setBrands (state, payload) {
      state.brands = payload
      state.brands.items.push({})
      state.brands.items.pop()
    },

    setAllCategories (state, payload) {
      state.allCategories = payload
    },

    removeBrandById (state, id) {
      const brandIndex = state.brands.items.findIndex(c => c.id === id)
      if (brandIndex !== -1) {
        state.brands.items.splice(brandIndex, 1)
        state.brands.meta.totalItems--
      }
    }
  },

  actions: {
    fetchBrands ({ commit, state }, page) {
      axios.get(`/brand?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setBrands', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchBrand (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/brand/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    createBrand (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1])
        })

        axios.post('/brand', formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateBrand (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1])
        })

        axios.put(`/brand/${data.id}`, formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeBrand ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/brand/${id}`)
          .then(() => {
            commit('removeBrandById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    fetchAllCategories ({ commit }) {
      axios.get('/category?page=1&limit=99999')
        .then(res => {
          commit('setAllCategories', res.data?.items ?? [])
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
