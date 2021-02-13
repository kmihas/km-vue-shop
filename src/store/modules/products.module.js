import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      product: {},
      loading: false,
      filter: {
        search: '',
        category: ''
      }
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
    setFilter(state, item) {
      state.filter = item
    }
  },
  actions: {
    async getProducts({commit}) {
      commit('setLoading', true)
      const url = `/products.json`
      const data = await requestAxios.get(url)
      if (data.data) {
        const result = Object.keys(data.data).map((item) => {
        return {
            id: item,
            ...data.data[item],
          }
        })
        await commit('setProducts', result)
      }
      commit('setLoading', false)
    },
    async getProductById({commit}, id) {
      commit('setProduct', {})
      commit('setLoading', true)
      const url = `/products/${id}.json`
      const data = await requestAxios.get(url)
      await commit('setProduct', {
        id: id,
        ...data.data})
      commit('setLoading', false)
    }
  },
  getters: {
    products(state){
      const filtered1 = state.filter.category === ''
        ? state.products
        : state.products.filter(item => item.category === state.filter.category)

      const filtered2 = state.filter.search === ''
        ? filtered1
        : filtered1.filter(item => {
          return !!item.title.toLowerCase()
            .includes(state.filter.search.toLowerCase(), 0)})

      return [
        ...filtered2.filter(el => +el.count !== 0),
        ...filtered2.filter(el => +el.count === 0)
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