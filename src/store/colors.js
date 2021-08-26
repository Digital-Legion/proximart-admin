import axios from 'axios'

export default {
  namespaced: true,

  state: {
    colors: null,
    limit: 10
  },

  mutations: {
    setColors (state, payload) {
      state.colors = payload
      state.colors.items.push({})
      state.colors.items.pop()
    },

    removeColorById (state, id) {
      const colorIndex = state.colors.items.findIndex(c => c.id === id)
      if (colorIndex !== -1) {
        state.colors.items.splice(colorIndex, 1)
        state.colors.meta.totalItems--
      }
    }
  },

  actions: {
    fetchColors ({ commit, state }, page) {
      axios.get(`/color?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setColors', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchColor (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/color/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    createColor (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/color', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateColor (_, data) {
      return new Promise((resolve, reject) => {
        axios.put(`/color/${data.id}`, data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeColor ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/color/${id}`)
          .then(() => {
            commit('removeColorById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
