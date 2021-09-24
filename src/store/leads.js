import axios from 'axios'

export default {
  namespaced: true,

  state: {
    leads: null,
    limit: 10
  },

  mutations: {
    setLeads (state, payload) {
      state.leads = payload
    },

    removeLeadById (state, id) {
      const index = state.leads.items.findIndex(c => c.id === id)
      if (index !== -1) {
        state.leads.items.splice(index, 1)
        state.leads.meta.totalItems--
      }
    }
  },

  actions: {
    fetchLeads ({ commit, state }, { page }) {
      axios.get(`/checkout/lead/all?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setLeads', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    removeLead ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/checkout/lead/${id}`)
          .then(() => {
            commit('removeLeadById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
