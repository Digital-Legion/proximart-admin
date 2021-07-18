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
      state.categories.items = state.categories.items.map(c => ({
        ...c,
        children: 'to-be-checked'
      }))
    },

    addToCategories (state, { data, parentId }) {
      const parentIndex = state.categories?.items?.findIndex(c => c.id === parentId)
      if (parentIndex >= 0) {
        const items = data.items[0].children.map(c => ({
          ...c,
          children: 'to-be-checked'
        }))
        if (typeof state.categories.items[parentIndex].children === 'object' && state.categories.items[parentIndex].children.length)
          state.categories.items[parentIndex].children.push(items)
        else state.categories.items[parentIndex].children = items
      } else {
        console.error(`Tried to find parent index with id ${parentId}`)
      }
    },

    setCascaderCategories (state, payload) {
      state.cascaderCategories = payload
    }
  },

  actions: {
    fetchCategories ({ commit, state }, { page, parentId }) {
      if (parentId === undefined) {
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
            commit('addToCategories', {
              data: res.data,
              parentId
            })
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
    }
  }
}
