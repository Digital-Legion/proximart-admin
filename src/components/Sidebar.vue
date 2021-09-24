<template>
  <aside class="g-sidebar" :class="{ active: menuOpen }">
    <div class="g-sidebar__bg" @click="hideMobileMenu" />
    <div class="g-sidebar__container" ref="sidebarContainer">
      <div class="g-sidebar__top" ref="sidebarTop">
        <router-link to="/" class="g-sidebar__logo">
          <img svg-inline src="@/assets/media/svg/proximart.svg" alt="Proximart">
        </router-link>
        <div class="toggler">
          <img svg-inline src="@/assets/media/svg/dropdown.svg" alt="Open/Close Menu">
        </div>
      </div>
      <div class="g-sidebar__bottom">
        <nav class="g-sidebar__nav">
          <ul @click="hideMobileMenu">
            <li>
              <div class="g-sidebar__nav-item g-sidebar__nav-item--profile g-sidebar__nav-item--no-hover mb-20">
                <font-awesome-icon icon="user-circle" class="g-sidebar__nav-icon" />
                <span>{{ profile ? profile.name : '' }}</span>
                <button class="g-sidebar__sign-out" @click="signOut">Sign out</button>
              </div>
            </li>
            <li>
              <router-link to="/categories" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/categories')}">
                <font-awesome-icon :icon="['fab', 'cuttlefish']" class="g-sidebar__nav-icon" />
                <span>Categories</span>
              </router-link>
            </li>
            <li>
              <router-link to="/brands" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/brands')}">
                <font-awesome-icon icon="bold" class="g-sidebar__nav-icon" />
                <span>Brands</span>
              </router-link>
            </li>
            <li>
              <router-link to="/colors" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/colors')}">
                <font-awesome-icon icon="palette" class="g-sidebar__nav-icon" />
                <span>Colors</span>
              </router-link>
            </li>
            <li>
              <router-link to="/products" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/products')}">
                <font-awesome-icon :icon="['fab', 'product-hunt']" class="g-sidebar__nav-icon" />
                <span>Products</span>
              </router-link>
            </li>
            <li>
              <router-link to="/devices" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/devices')}">
                <font-awesome-icon :icon="['fab', 'dochub']" class="g-sidebar__nav-icon" />
                <span>Devices</span>
              </router-link>
            </li>
            <li>
              <router-link to="/banners" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/banners')}">
                <font-awesome-icon icon="pager" class="g-sidebar__nav-icon" />
                <span>Banners</span>
              </router-link>
            </li>
            <li>
              <router-link to="/orders" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/orders')}">
                <font-awesome-icon icon="clipboard-list" class="g-sidebar__nav-icon" />
                <span>Orders</span>
              </router-link>
            </li>
            <li>
              <router-link to="/leads" class="g-sidebar__nav-item" :class="{'router-link-exact-active': $route.path.startsWith('/leads')}">
                <font-awesome-icon icon="user-friends" class="g-sidebar__nav-icon" />
                <span>Leads</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="g-sidebar__toggler" @click="toggleMenu" v-if="isMobile()">
          <img svg-inline src="@/assets/media/svg/dropdown.svg" alt="Open/Close Menu">
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import IsMobile from '@/mixins/IsMobile'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Sidebar',

  mixins: [IsMobile],

  data () {
    return {
      menuOpen: false,
      mobileMenuInit: false
    }
  },

  mounted () {
    if (window.innerWidth <= 600) { this.initMobileMenu() }

    window.addEventListener('resize', this.onResize)
  },

  computed: {
    ...mapState('auth', ['profile'])
  },

  methods: {
    ...mapMutations('auth', ['signOut']),

    toggleMenu () {
      this.menuOpen = !this.menuOpen
    },

    onResize () {
      if (window.innerWidth <= 600 && !this.mobileMenuInit) { this.initMobileMenu() }
    },

    hideMobileMenu () {
      this.menuOpen = false
    },

    openMobileMenu () {
      this.menuOpen = true
    },

    initMobileMenu () {
      this.mobileMenuInit = true

      const offset = 84

      const mobileMenuCloser = this.$refs.sidebarTop
      const mobileMenu = this.$refs.sidebarContainer
      let drag = false
      let curLoc = 0
      let startLoc = 0
      let touchStartTime = 0

      const onMouseMove = e => {
        if (drag) {
          curLoc = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
          curLoc -= startLoc + offset

          if (curLoc > -offset) { curLoc = -offset }

          mobileMenu.style.transform = `translateY(${curLoc}px)`
        }
      }

      const onMouseUp = () => {
        if (!drag) return

        mobileMenu.style.transition = ''
        setTimeout(() => {
          mobileMenu.style.transform = ''
        }, 1)

        if (new Date() - touchStartTime < 199) {
          this.toggleMenu()
        } else {
          setTimeout(() => {
            if (-curLoc - offset >= mobileMenu.getBoundingClientRect().height / 4 && this.menuOpen) {
              this.hideMobileMenu()
            } else if (-curLoc - offset <= mobileMenu.getBoundingClientRect().height / 4 * 3 && !this.menuOpen) {
              this.openMobileMenu()
            }
          }, 1)
        }

        drag = false
      }

      const onCloser = e => {
        e.preventDefault()
        mobileMenu.style.transition = 'none'
        touchStartTime = new Date()
        startLoc = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
        startLoc -= mobileMenu.getBoundingClientRect().y
        drag = true
      }

      mobileMenuCloser.addEventListener('mousedown', e => {
        onCloser(e)
      })
      mobileMenuCloser.addEventListener('touchstart', e => {
        onCloser(e)
      })

      window.addEventListener('mousemove', onMouseMove, false)
      window.addEventListener('touchmove', onMouseMove, false)
      window.addEventListener('mouseup', onMouseUp, false)
      window.addEventListener('touchend', onMouseUp, false)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/sidebar';
</style>
