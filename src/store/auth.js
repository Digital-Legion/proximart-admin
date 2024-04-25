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
        localStorage.setItem('token', 'default')
        resolve(true)
      })
    },

    getProfile ({ commit }) {
      commit('setProfile', {
        name: 'Mocky'
      })
    }
  }
}
