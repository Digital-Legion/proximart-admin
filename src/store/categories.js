import axios from 'axios'

export default {
  namespaced: true,

  state: {
    categories: null,
    cascaderCategories: null,
    limit: 12
  },

  mutations: {
    setCategories (state, payload) {
      state.categories = payload
      state.categories.items.push({})
      state.categories.items.pop()
    },

    addToCategories (state, payload) {
      state.categories.meta = payload.meta
      state.categories.items = [...state.categories.items, ...payload.items]
    },

    setCascaderCategories (state, payload) {
      state.cascaderCategories = payload
    },

    removeCategoryById (state, id) {
      const categoryIndex = state.categories.items.findIndex(c => c.id === id)
      if (categoryIndex !== -1) {
        state.categories.items.splice(categoryIndex, 1)
        state.categories.meta.totalItems--
      }
    }
  },

  actions: {
    fetchCategories ({ commit, state }, { page, parentId }) {
      if (typeof parentId !== 'string') {
        axios.get(`/category?page=${page}&limit=${state.limit}`)
          .then(res => {
            commit('setCategories', res.data)
          })
          .catch(e => {
            console.error(e)
          })
      } else {
        axios.get(`/category/children/${parentId}?page=${page}&limit=${state.limit}`)
          .then(res => {
            if (page === 1) {
              commit('setCategories', res.data)
            } else {
              commit('addToCategories', res.data)
            }
          })
          .catch(e => {
            console.error(e)
          })
      }
    },

    fetchCascaderCategories ({ commit, state }) {
      axios.get('/category/cascader')
        .then(res => {
          commit('setCascaderCategories', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchCategory (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/category/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    createCategory (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1])
        })

        axios.post('/category', formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateCategory (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1])
        })

        axios.put(`/category/${data.id}`, formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeCategory ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/category/${id}`)
          .then(() => {
            commit('removeCategoryById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
