import { createLogger, createStore } from 'vuex'
import auth from './modules/auth.module'
import cart from './modules/cart.module'
import categories from './modules/categories.module'
import orders from './modules/orders.module'
import products from './modules/products.module'
import users from './modules/users.module'

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
