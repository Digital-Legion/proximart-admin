<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NoAuthLayout',

  created () {
    if (localStorage.getItem('token'))
      this.$router.push('/')
  }
}
</script>
