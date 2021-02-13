import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      loading: false
    }
  },
  mutations: {
    setCategories(state, item) {
      state.categories = item
    },
    setLoading(state, item) {
      state.loading = item
    }
  },
  actions: {
    async getCategories({commit}) {
      commit('setLoading', true)
      const data = await requestAxios.get('/categories.json')
      if (data.data) {
        const result = Object.keys(data.data).map((item) => {
        return {
            id: item,
            ...data.data[item],
          }
        })
        await commit('setCategories', result)
      }
      commit('setLoading', false)
    },
  },
  getters: {
    categories(state) {
      return state.categories
    },
    loading(state) {
      return state.loading
    }
  }
}