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
      const search = payload.search ? `&q=${payload.search}` : ''
      const category = payload.category && payload.category !== 'all' ? `&category=${payload.category}` : ''
      const url = `/products?_sort=category,title&_order=desc,asc${search}${category}`
      const data = await requestAxios.get(url)
      await commit('setProducts', data.data)
      commit('setLoading', false)
    },
    async getProductById({commit}, id) {
      commit('setLoading', true)
      const url = `/products/${id}`
      const data = await requestAxios.get(url)
      await commit('setProduct', data.data)
      commit('setLoading', false)
    }
  },
  getters: {
    products(state) {
      return [
        ...state.products.filter(el => +el.count !== 0),
        ...state.products.filter(el => +el.count === 0)
      ]
    },
    loading(state) {
      return state.loading
    },
    product(state) {
      return state.product
    }
  }
}