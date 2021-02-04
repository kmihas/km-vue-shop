import { getProducts } from '../../use/products'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    setProducts(state, item) {
      console.log(item)

      state.products = item
    }
  },
  actions: {
    async getAllProducts({commit}) {
      const data = await getProducts()
      commit('setProducts', data)
    }
  },
  getters: {
    products(state) {
      return state.products
    }
  }
}