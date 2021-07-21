<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    NoAuthLayout: () => import('@/layouts/no-auth-layout'),
    AuthLayout: () => import('@/layouts/auth-layout')
  },

  created () {
    if (localStorage.getItem('token')) {
      this.getProfile()
    }
  },

  computed: {
    layout () {
      return this.$route.meta.layout
    }
  },

  methods: {
    ...mapActions('auth', ['getProfile'])
  }
}
</script>
