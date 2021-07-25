import axios from 'axios'

export default {
  namespaced: true,

  state: {
    products: null,
    allBrands: [],
    allColors: [],
    allDevices: [],
    limit: 10
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
    },

    setAllDevices (state, payload) {
      state.allDevices = payload
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
        axios.post('/color/product', createColorFormDataWithFilesNoId(data))
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
        axios.put(`/color/product-color/${data.id}`, createColorFormDataWithFilesNoId(data))
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
    },

    async saveMeta (_, data) {
      const formData = new FormData()
      Object.entries(data.meta).forEach(entry => {
        formData.append(entry[0], entry[1])
      })

      if (data.metaId)
        return await axios.put(`/product/meta/${data.metaId}`, formData)
      return await axios.post('/product/meta', formData)
    },

    async fetchAllParameters (_, productId) {
      return new Promise((resolve, reject) => {
        axios.get(`/category/parameters/${productId}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    async saveParameters (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/parameters/product', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    async fetchAllDevices ({ commit }) {
      axios.get('/device?page=1&limit=99999')
        .then(res => {
          commit('setAllDevices', res.data?.items ?? [])
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}

const createColorFormDataWithFilesNoId = data => {
  const formData = new FormData()
  Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
    if (entry[0] === 'files') {
      entry[1].forEach(file => {
        formData.append(typeof file === 'string' ? 'urls' : 'files', file)
      })
    } else formData.append(entry[0], entry[1])
  })
  return formData
}
