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
        category: '',
        page: '1'
      },
      perPage: process.env.VUE_APP_PERPAGE
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
    },
    setPerPage(state, item) {
      state.perPage = item
    },
    setPage(state, item) {
      state.filter.page = +item
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
    },
    async saveProductById({commit}, item) {
      const url = `/products/${item.id}.json`
      const body = {...item}
      delete body.id
      await requestAxios.put(url, body)
    },
    async saveProduct({commit}, item) {
      const url = '/products.json'
      await requestAxios.post(url, item)
    },
    async deleteProduct({commit}, item) {
      const url = `/products/${item}.json`
      await requestAxios.delete(url)
    }
  },
  getters: {
    productsFiltered(state){

      const filtered = [
        ...state.products.filter(el => +el.count !== 0),
        ...state.products.filter(el => +el.count === 0)
      ]

      const applyCategory = state.filter.category === ''
        ? filtered
        : filtered.filter(item => item.category === state.filter.category)

      const applySearch = state.filter.search === ''
        ? applyCategory
        : applyCategory.filter(item => {
          return !!item.title.toLowerCase()
            .includes(state.filter.search.toLowerCase(), 0)})

      return applySearch
    },
    products(state, getters) {
      const pageStart = ((+state.filter.page) - 1) * (+state.perPage)
      const pageEnd = ((+pageStart) + (+state.perPage)) < getters.productsFiltered.length
          ? (+pageStart) + (+state.perPage)
          : getters.productsFiltered.length

      const outPage = getters.productsFiltered.slice(pageStart, pageEnd)

      return [...outPage]
    },
    productsCount(state) {
      return state.products.length
    },
    perPage(state) {
      return state.perPage
    },
    loading(state) {
      return state.loading
    },
    product(state) {
      return state.product
    }
  }
}