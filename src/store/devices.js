import axios from 'axios'

export default {
  namespaced: true,

  state: {
    devices: null,
    limit: 10
  },

  mutations: {
    setDevices (state, payload) {
      state.devices = payload
      state.devices.items.push({})
      state.devices.items.pop()
    },

    removeDeviceById (state, id) {
      const brandIndex = state.devices.items.findIndex(c => c.id === id)
      if (brandIndex !== -1) {
        state.devices.items.splice(brandIndex, 1)
        state.devices.meta.totalItems--
      }
    },

    setAllBrands (state, payload) {
      state.allBrands = payload
    },

    setAllColors (state, payload) {
      state.allColors = payload
    }
  },

  actions: {
    fetchDevices ({ commit, state }, page) {
      axios.get(`/device?page=${page}&limit=${state.limit}`)
        .then(res => {
          commit('setDevices', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    },

    createDevice (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/device', data)
          .then(res => {
            resolve(res)
            console.log('yes')
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateDevice (_, data) {
      return new Promise((resolve, reject) => {
        axios.put(`/device/${data.id}`, data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    removeDevice ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/device/${id}`)
          .then(() => {
            commit('removeDeviceById', id)
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
