import requestAxios from '../../axios/request'
const LOCAL_CART_KEY = 'km-shop-cart'

export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || {},
      cartProducts: {},
      products: [],
      loading: false

    }
  },
  mutations: {
    setProducts(state, item) {
      state.products = item
    },
    setCartProducts(state, item) {
      state.cartProducts = item
    },
    setLoading(state, item) {
      state.loading = item
    },
    upProductCount(state, id) {
      if(state.cart[id]) {
        state.cart[id]++
      } else {
        state.cart[id] = 1
      }
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart))
    },
    downProductCount(state, id) {
      if(state.cart[id] > 1) {
        state.cart[id]--
      } else {
        const idx = state.cartProducts.findIndex(el => el.id === id)
        delete state.cart[id]
        state.cartProducts.splice(idx, 1)
      }
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart))
    }
  },
  actions: {
    async getPageProducts({commit}) {
      commit('setLoading', true)
      const data = await requestAxios.get('/products')
      await commit('setProducts', data.data)
      commit('setLoading', false)
    },
    async getCartProducts({commit, state}) {
      commit('setLoading', true)
      const url = Object.keys(state.cart).reduce((acc, id) => {
        return acc += `id=${id}&`
      }, '/products?')
      const data = await requestAxios.get(url)
      commit('setCartProducts', data.data)
      commit('setLoading', false)
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    cart(state) {
      return state.cart
    },
    cartProducts(state) {
      return state.cartProducts
    },
    cartCount(state) {
      return Object.keys(state.cart).reduce((acc, id) => {
        return acc += state.cart[id]
      }, 0)
    },
    loading(state) {
      return state.loading
    }
  }
}