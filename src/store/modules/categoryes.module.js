import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      categoryes: [],
      loading: false
    }
  },
  mutations: {
    setCategoryes(state, item) {
      state.categoryes = item
    },
    setLoading(state, item) {
      state.loading = item
    }
  },
  actions: {
    async getCategoryes({commit}) {
      commit('setLoading', true)
      const data = await requestAxios.get('/categories')
      await commit('setCategoryes', data.data)
      commit('setLoading', false)
    },
  },
  getters: {
    categoryes(state) {
      return state.categoryes
    },
  }
}