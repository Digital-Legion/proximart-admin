<template>
  <div id="app">
    <sidebar />
    <div class="container page-container" :class="{'container--large': $route.name === 'earn'}">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import('@/components/Sidebar')
  }
}
</script>
