import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import Auth from '../views/Auth'
import Product from '../views/Product'
import Shop from '../views/Shop'

const routes = [
  {
    path: '/shop',
    alias: '/',
    name: 'shop',
    component: Shop,
    props: route => ({ query: route.query.q, query: route.query.category }),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/product/:id?',
    name: 'profuct',
    component: Product,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      layout: 'auth',
      auth: false
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
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAutenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAutenticated']) {
    next('/auth?message=auth')
  }
  else {
    next()
  }
})

export default router
