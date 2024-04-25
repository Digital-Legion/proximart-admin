import axios from 'axios'

export default {
  namespaced: true,

  actions: {
    fetchSettings () {
      return new Promise((resolve, reject) => {
        axios.get('/setting/1')
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    updateSettings (_, data) {
      return new Promise((resolve, reject) => {
        axios.put('/setting/1', data)
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
