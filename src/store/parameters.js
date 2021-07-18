import axios from 'axios'

export default {
  namespaced: true,

  state: {
    parameters: null,
    limit: 12
  },

  mutations: {
    setParameters (state, payload) {
      state.parameters = payload
      state.parameters.items.push({})
      state.parameters.items.pop()
    },

    addToParameters (state, payload) {
      state.parameters.items = [...state.parameters.items, ...payload.items]
    },

    removeParameterById (state, id) {
      const index = state.parameters.items.findIndex(c => c.id === id)
      if (index !== -1) {
        state.parameters.items.splice(index, 1)
      }
    }
  },

  actions: {
    fetchParameters ({ commit, state }, { page, categoryId }) {
      axios.get(`/parameters?page=${page}&limit=${state.limit}&category=${categoryId}`)
        .then(res => {
          if (page === 1)
            commit('setParameters', res.data)
          else commit('addToParameters', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    createParameter (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/parameters', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateParameter (_, { data, id }) {
      return new Promise((resolve, reject) => {
        axios.put(`/parameters/${id}`, data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeParameter ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/parameters/${id}`)
          .then(() => {
            commit('removeParameterById', id)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
