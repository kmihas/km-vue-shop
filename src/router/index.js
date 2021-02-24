import store from '@/store/index'
import Auth from '@/views/Auth'
import Product from '@/views/Product'
import Shop from '@/views/Shop'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/shop',
    alias: '/',
    name: 'shop',
    component: Shop,
    props: route => ({
      query: route.query.search,
      query: route.query.category,
      query: route.query.page
    }),
    meta: {
      layout: 'main',
      admin: false
    }
  },
  {
    path: '/product/:id?',
    name: 'product',
    component: Product,
    meta: {
      layout: 'main',
      admin: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart'),
    meta: {
      layout: 'main',
      admin: false
    }
  },
  {
    path: '/admin',
    name: 'admin',
    alias: '/admin/',
    redirect: '/admin/products',
    component: () => import('@/views/Admin'),
    meta: {
      layout: 'admin',
      admin: true
    },
    children: [
      {
        path: 'products',
        component: () => import('@/views/admin/AdminProducts'),
        props: route => ({
          query: route.query.search,
          query: route.query.category,
          query: route.query.page
        }),
      },
      {
        path: 'categories',
        component: () => import('@/views/admin/AdminCategories'),
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/AdminOrders')
      },
      {
        path: 'order/:id?',
        component: () => import('@/views/admin/AdminOrder')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: {
      layout: 'auth',
      admin: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAdmin = to.meta.admin

  if(store.getters['auth/needUpdateToken']) {
    store.dispatch('auth/updateToken')
  }

  if(requireAdmin && store.getters['auth/isAdmin']) {
    next()
  } else if (requireAdmin && !store.getters['auth/isAdmin']) {
    next('/auth?message=auth')
  }
  else {
    next()
  }
})

export default router
