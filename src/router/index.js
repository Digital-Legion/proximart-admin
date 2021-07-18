import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/categories'
    // name: 'index',
    // component: () => import('@/pages/index.vue')
  },
  {
    path: '/categories',
    component: () => import('@/pages/categories/index.vue'),
    children: [
      {
        path: '',
        name: 'categories',
        component: () => import('@/pages/categories/all.vue')
      },
      {
        path: 'add',
        name: 'categories-add',
        component: () => import('@/pages/categories/add-edit.vue')
      },
      {
        path: ':id',
        name: 'categories-edit',
        props: true,
        component: () => import('@/pages/categories/add-edit.vue')
      }
    ]
  },
  {
    path: '/parameters/:id',
    name: 'parameters',
    props: true,
    component: () => import('@/pages/parameters/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
