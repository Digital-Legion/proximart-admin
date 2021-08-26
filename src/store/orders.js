import axios from 'axios'

export default {
  namespaced: true,

  state: {
    orders: null,
    limit: 10
  },

  mutations: {
    setOrders (state, payload) {
      state.orders = payload
      state.orders.items.push({})
      state.orders.items.pop()
    },

    removeOrderById (state, id) {
      const orderIndex = state.orders?.items?.findIndex(c => c.id === id)
      if (orderIndex >= 0) {
        state.orders.items.splice(orderIndex, 1)
        state.orders.meta.totalItems--
      }
    }
  },

  actions: {
    fetchOrders ({ commit, state }, { page }) {
      axios.get(`/checkout?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setOrders', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchOrder (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/checkout/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeOrder ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/checkout/${id}`)
          .then(() => {
            commit('removeOrderById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
