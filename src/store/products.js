import axios from 'axios'

export default {
  namespaced: true,

  state: {
    products: null,
    allBrands: [],
    limit: 12
  },

  mutations: {
    setProducts (state, payload) {
      state.products = payload
      state.products.items.push({})
      state.products.items.pop()
    },

    addToProducts (state, payload) {
      state.products.items.unshift(payload)
      state.products.meta.totalItems++
    },

    removeProductById (state, id) {
      const brandIndex = state.products.items.findIndex(c => c.id === id)
      if (brandIndex !== -1) {
        state.products.items.splice(brandIndex, 1)
        state.products.meta.totalItems--
      }
    },

    setAllBrands (state, payload) {
      state.allBrands = payload
    }
  },

  actions: {
    fetchProducts ({ commit, state }, page) {
      console.log(page)
      axios.get(`/product?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setProducts', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchProduct (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/product/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    createProduct (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/product', data)
          .then(res => {
            resolve(res)
            console.log('yes')
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateProduct (_, data) {
      return new Promise((resolve, reject) => {
        axios.put(`/product/${data.id}`, data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeProduct ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/product/${id}`)
          .then(() => {
            commit('removeProductById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    fetchAllBrands ({ commit }) {
      axios.get('/brand?page=1&limit=99999')
        .then(res => {
          commit('setAllBrands', res.data?.items ?? [])
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
