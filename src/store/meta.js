import axios from 'axios'

export default {
  namespaced: true,

  state: {
    metas: null,
    limit: 10
  },

  mutations: {
    setMetas (state, payload) {
      state.metas = payload
      state.metas.items.push({})
      state.metas.items.pop()
    }

    // addToCategories (state, payload) {
    //   state.categories.meta = payload.meta
    //   state.categories.items = [...state.categories.items, ...payload.items]
    // },

    // setCascaderCategories (state, payload) {
    //   state.cascaderCategories = payload
    // },

    // removeCategoryById (state, id) {
    //   const categoryIndex = state.categories.items.findIndex(c => c.id === id)
    //   if (categoryIndex !== -1) {
    //     state.categories.items.splice(categoryIndex, 1)
    //     state.categories.meta.totalItems--
    //   }
    // }
  },

  actions: {
    fetchMetas ({ commit, state }, page) {
      axios.get(`/meta?page=${page.page}&limit=${state.limit}`)
        .then(res => {
          commit('setMetas', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    // fetchCascaderCategories({commit}) {
    //   axios.get('/category/cascader')
    //     .then(res => {
    //       commit('setCascaderCategories', res.data)
    //     })
    //     .catch(e => {
    //       console.error(e)
    //     })
    // },

    fetchMeta (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/meta/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    // createMeta (_, data) {
    //   return new Promise((resolve, reject) => {
    //     const formData = new FormData()
    //     Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
    //       formData.append(entry[0], entry[1])
    //     })
    //
    //     axios.post('/meta', formData)
    //       .then(res => {
    //         resolve(res)
    //       })
    //       .catch(e => {
    //         reject(e)
    //       })
    //   })
    // },

    updateMeta (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1])
        })

        axios.put(`/meta/${data.id}`, formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }

    // removeCategory({commit}, id) {
    //   return new Promise((resolve, reject) => {
    //     axios.delete(`/category/${id}`)
    //       .then(() => {
    //         commit('removeCategoryById', id)
    //         resolve()
    //       })
    //       .catch(e => {
    //         reject(e)
    //       })
    //   })
    // },

    // async saveMeta(_, data) {
    //   const formData = new FormData()
    //   Object.entries(data.meta).forEach(entry => {
    //     formData.append(entry[0], entry[1])
    //   })
    //
    //   if (data.metaId)
    //     return await axios.put(`/category/meta/${data.metaId}`, formData)
    //   return await axios.post('/category/meta', formData)
    // }
  }
}
