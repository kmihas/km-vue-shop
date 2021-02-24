import auth from '@/store/modules/auth.module'
import cart from '@/store/modules/cart.module'
import categories from '@/store/modules/categories.module'
import orders from '@/store/modules/orders.module'
import products from '@/store/modules/products.module'
import users from '@/store/modules/users.module'
import { createLogger, createStore } from 'vuex'

const plugins = []

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  // plugins,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth,
    cart,
    categories,
    products,
    orders,
    users
  }
})
