<template>
  <div class="auth-page">
    <header class="auth-page__header">
      <img svg-inline src="@/assets/media/svg/proximart.svg" alt="Proximart">
    </header>
    <page-box class="auth-page__box" title="Login">
      <loading
        :active.sync="wait"
        :can-cancel="false"
        :is-full-page="false"
      />

      <form @submit.prevent="submit">
        <CustomInput v-model="email" type="email" class="mb-20" placeholder="Email" />
        <CustomInput
          v-model="password"
          type="password"
          placeholder="Password"
          @toggle-password="showPassword = !showPassword"
          :show-password="showPassword"
          class="mb-20"
        />
        <button type="submit" class="g-button auth-page__submit">
          <span>Submit</span>
        </button>
      </form>
    </page-box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  components: {
    PageBox: () => import('@/components/PageBox'),
    CustomInput: () => import('@/components/CustomInput')
  },

  data () {
    return {
      email: '',
      password: '',
      showPassword: false,

      wait: false
    }
  },

  methods: {
    ...mapActions('auth', ['login', 'getProfile']),

    async submit () {
      this.wait = true
      await this.login({ email: this.email, password: this.password })
        .then(async res => {
          localStorage.setItem('token', res.data.access_token)
          await this.getProfile()
          this.$router.push('/').catch(() => {})
        })
        .catch(e => {
          this.$toasted.error(e.response.data.error || e.response.data.message)
        })
      this.wait = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/auth';
</style>
