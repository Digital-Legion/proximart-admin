import axios from 'axios'

export default {
  namespaced: true,

  state: {
    products: null,
    allBrands: [],
    allColors: [],
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
    },

    setAllColors (state, payload) {
      state.allColors = payload
    }
  },

  actions: {
    fetchProducts ({ commit, state }, page) {
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

    createProductColor (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/color/product', createFormDataWithFilesNoId(data))
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateProductColor (_, data) {
      return new Promise((resolve, reject) => {
        axios.put(`/color/product-color/${data.id}`, createFormDataWithFilesNoId(data))
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    deleteProductColor (_, data) {
      return new Promise((resolve, reject) => {
        axios.delete(`/color/product-color/${data.id}`)
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
    },

    fetchAllColors ({ commit }) {
      axios.get('/color?page=1&limit=99999')
        .then(res => {
          commit('setAllColors', res.data?.items ?? [])
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}

const createFormDataWithFilesNoId = data => {
  const formData = new FormData()
  Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
    if (entry[0] === 'files') {
      entry[1].forEach(file => {
        formData.append(entry[0], file)
      })
    } else formData.append(entry[0], entry[1])
  })
  return formData
}
