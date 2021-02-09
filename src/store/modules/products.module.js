import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      product: {},
      loading: false
    }
  },
  mutations: {
    setProducts(state, item) {
      state.products = item
    },
    setProduct(state, item) {
      state.product = item
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
    async getProductById({commit}, id) {
      commit('setProduct', {})
      commit('setLoading', true)
      const url = `/products/${id}`
      const data = await requestAxios.get(url)
      await commit('setProduct', data.data)
      commit('setLoading', false)
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    loading(state) {
      return state.loading
    },
    product(state) {
      return state.product
    }
  }
}