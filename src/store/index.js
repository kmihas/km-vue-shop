import { createLogger, createStore } from 'vuex'
import auth from './modules/auth.module'
import cart from './modules/cart.module'
import categoryes from './modules/categoryes.module'
import products from './modules/products.module'

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
  modules: {
    auth,
    cart,
    categoryes,
    products
  }
})
