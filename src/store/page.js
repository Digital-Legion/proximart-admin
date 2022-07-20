import axios from 'axios'

export default {
  namespaced: true,

  state: {
    pages: null,
    limit: 10
  },

  mutations: {
    setPages (state, payload) {
      state.pages = payload
      state.pages.items.push({})
      state.pages.items.pop()
    }
  },

  actions: {
    fetchPages ({ commit, state }, page) {
      axios.get(`/page?page=${page.page}&limit=${state.limit}`)
        .then(res => {
          commit('setPages', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    fetchPage (_, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/page/get-by-id/${id}`)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updatePage (_, data) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        Object.entries(data).filter(v => v[0] !== 'id').forEach(entry => {
          formData.append(entry[0], entry[1] instanceof File || ['string', 'number'].includes(typeof entry[1]) ? entry[1] : JSON.stringify(entry[1]))
        })

        axios.put(`/page/${data.id}`, formData)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removePage ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/page/${id}`)
          .then(() => {
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
