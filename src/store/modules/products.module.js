import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
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
  },
  actions: {
    async getProducts({commit}, payload = {}) {
      commit('setLoading', true)
      let url = '/products?_sort=count,title&_order=desc,asc'
      if(payload.search){
        url += `&q=${payload.search}`
      }
      if(payload.category && payload.category !== 'all') {
        url += `&category=${payload.category}`
      }
      const data = await requestAxios.get(url)
      await commit('setProducts', data.data)
      commit('setLoading', false)
    },
  },
  getters: {
    products(state) {
      return state.products
    },
    loading(state) {
      return state.loading
    }
  }
}