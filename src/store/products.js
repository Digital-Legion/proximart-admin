import axios from 'axios'

export default {
  namespaced: true,

  state: {
    products: null,
    allBrands: [],
    allColors: [],
    allDevices: [],
    allCategories: [],
    limit: 10
  },

  mutations: {
    setProducts (state, payload) {
      state.products = payload
      state.products.items.push({})
      state.products.items.pop()
    },

    addToProducts (state, payload) {
      if (!state.products) {
        state.products = {
          items: []
        }
      }

      state.products.items.unshift(payload)
    },

    removeProductById (state, id) {
      const brandIndex = state.products.items.findIndex(c => c.id === id)
      if (brandIndex !== -1) {
        state.products.items.splice(brandIndex, 1)
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
    },

    setAllCategories (state, payload) {
      state.allCategories = payload
    }
  },

  actions: {
    fetchProducts ({ commit, state }, { page, filters }) {
      return state.products
    },

    fetchProduct ({ state }, id) {
      return { data: state.products.items.find(p => p.id === id) }
    },

    async createProduct ({ commit }, data) {
      commit('addToProducts', {
        ...data,
        id: String(Date.now())
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

    async removeProduct ({ commit }, id) {
      commit('removeProductById', id)
    },

    async fetchAllBrands ({ commit }) {
    },

    async fetchAllColors ({ commit }) {
    },

    async fetchAllCategories ({ commit }) {
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
