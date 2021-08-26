import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/auth/index.vue'),
    meta: {
      layout: 'no-auth-layout'
    }
  },
  {
    path: '/',
    redirect: '/categories'
  },
  {
    path: '/categories',
    component: () => import('@/pages/categories/index.vue'),
    children: [
      {
        path: '',
        name: 'categories',
        component: () => import('@/pages/categories/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: 'add',
        name: 'categories-add',
        component: () => import('@/pages/categories/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: ':id',
        name: 'categories-edit',
        props: true,
        component: () => import('@/pages/categories/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/brands',
    component: () => import('@/pages/brands/index.vue'),
    children: [
      {
        path: '',
        name: 'brands',
        component: () => import('@/pages/brands/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: 'add',
        name: 'brands-add',
        component: () => import('@/pages/brands/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: ':id',
        name: 'brands-edit',
        props: true,
        component: () => import('@/pages/brands/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/colors',
    component: () => import('@/pages/colors/index.vue'),
    children: [
      {
        path: '',
        name: 'colors',
        component: () => import('@/pages/colors/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: 'add',
        name: 'colors-add',
        component: () => import('@/pages/colors/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: ':id',
        name: 'colors-edit',
        props: true,
        component: () => import('@/pages/colors/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/orders',
    component: () => import('@/pages/orders/index.vue'),
    children: [
      {
        path: '',
        name: 'orders',
        component: () => import('@/pages/orders/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: ':id',
        name: 'orders-edit',
        props: true,
        component: () => import('@/pages/orders/order.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/products',
    component: () => import('@/pages/products/index.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: () => import('@/pages/products/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      },
      {
        path: ':id',
        name: 'products-edit',
        props: true,
        component: () => import('@/pages/products/add-edit.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/parameters/:id',
    name: 'parameters',
    props: true,
    component: () => import('@/pages/parameters/index.vue'),
    meta: {
      layout: 'auth-layout'
    }
  },
  {
    path: '/devices',
    component: () => import('@/pages/devices/index.vue'),
    children: [
      {
        path: '',
        name: 'devices',
        component: () => import('@/pages/devices/all.vue'),
        meta: {
          layout: 'auth-layout'
        }
      }
    ]
  },
  {
    path: '/banners',
    name: 'banners',
    component: () => import('@/pages/banners/index.vue'),
    meta: {
      layout: 'auth-layout'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
