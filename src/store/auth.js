import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,

  state: {
    profile: null
  },

  mutations: {
    setProfile (state, payload) {
      state.profile = payload
    },

    signOut (state) {
      if (!window.onbeforeunload) {
        localStorage.removeItem('token')
        state.profile = null
        router.push('/auth').catch(() => {})
      } else {
        alert('Save or cancel your changes first')
      }
    }
  },

  actions: {
    login (_, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            console.error(e)
            reject(e)
          })
      })
    },

    getProfile ({ commit }) {
      axios.get('/auth/profile')
        .then(res => {
          commit('setProfile', res.data)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
