import { useToast } from 'vue-toastification'
import requestAxios from '../../axios/request'

const toast = useToast()

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      product: {},
      productsName: {},
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
    },
    setCount(state, item) {
      state.products[item.idx].count = item.count
    },
    setProductsName(state, item) {
      state.productsName = item
    },
    addProductName(state, item) {
      state.productsName[item.id] = item.title
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
      const {data} = await requestAxios.put(url, body)
      if(data) {
        toast.success('Сохранено')
      }
    },
    async saveProduct({commit}, item) {
      const url = '/products.json'
      const {data} = await requestAxios.post(url, item)
      if(data) {
        toast.success('Сохранено')
      }
    },
    async deleteProduct({commit}, item) {
      const url = `/products/${item}.json`
      const {data} = await requestAxios.delete(url)
      if(data) {
        toast.info('Удалено')
      }
    },
    async changeCountById({state, commit}, item) {
      const url = `/products/${item.id}.json`
      const idx = state.products.findIndex(el => el.id === item.id)
      const count = (+state.products[idx].count) - (+item.count)
      const {data} = await requestAxios.patch(url, { count })
      if(data) {
        commit('setCount', {idx, count})
      }
    },
    getProductsName({commit, dispatch}, item) {
      commit('setProductsName', {})
			const count = item.length
			let i = 0
			setInterval(() => {
        if (i < count) {
          dispatch('getProductName', item[i])
          i++
				} else {
          return
				}
			}, process.env.VUE_APP_REQUEST_TIMEOUT)
    },
    async getProductName({commit}, item) {
      const url = `/products/${item}.json`
      const {data} = await requestAxios.get(url)
      commit('addProductName', {
        id: item,
        ...data
      })
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
    },
    productsName(state) {
      return state.productsName
    }
  }
}