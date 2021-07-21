<template>
  <div>
    <sidebar />
    <div class="container page-container" :class="{'container--large': $route.name === 'earn'}">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  components: {
    Sidebar: () => import('@/components/Sidebar')
  },

  created () {
    if (!localStorage.getItem('token'))
      this.$router.push('/auth')
  }
}
</script>
