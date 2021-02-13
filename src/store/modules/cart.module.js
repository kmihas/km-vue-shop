import requestAxios from '../../axios/request'
const LOCAL_CART_KEY = 'km-shop-cart'

export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) ?? {},
      cartProducts: [],
      loading: false
    }
  },
  mutations: {
    addCartProducts(state, item) {
      state.cartProducts.push(item)
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
      if(+state.cart[id] > 1) {
        state.cart[id]--
      } else {
        delete state.cart[id]
        const idx = state.cartProducts.findIndex(el => el.id === id)
        state.cartProducts.splice(idx, 1)
      }
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart))
    },
    addToCart(state, id) {
      state.cart[id] = 1
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(state.cart))
    }
  },
  actions: {
    getCartProducts({commit, state, getters}) {
      commit('setCartProducts', [])
      const Cart = Object.keys(state.cart)
      if(getters.cartCount)
      {
        commit('setLoading', true)
        Cart.forEach(async (item) => {
          const url = `/products/${item}.json`
          const data = await requestAxios.get(url)
          await commit('addCartProducts', {
            id: item,
            ...data.data
          })
          await commit('setLoading', false)
        })
      }
    }
  },
  getters: {
    cart(state) {
      return state.cart
    },
    cartCount(state) {
      return Object.keys(state.cart).reduce((acc, id) => {
        return acc += state.cart[id]
      }, 0)
    },
    loading(state) {
      return state.loading
    },
    cartProducts(state) {
      return state.cartProducts
    }
  }
}