import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
      loading: false,
      currentOrder: {}
    }
  },
  mutations: {
    setLoading(state, item) {
      state.loading = item
    },
    setOrders(state, item) {
      state.orders = item
    },
    setCurrentOrder(state, item) {
      state.currentOrder = item
    }
  },
  actions: {
    async getOrders({commit}) {
      commit('setLoading', true)
      const url = `/orders.json`
      const {data} = await requestAxios.get(url)
      if (data) {
        const result = Object.keys(data).map((item) => {
        return {
            id: item,
            ...data[item],
          }
        })
        await commit('setOrders', result)
      }
      await commit('setLoading', false)
    },
    async saveOrder({commit,dispatch}, item) {
      const url = `/orders.json`
      const {data} = await requestAxios.post(url, item)
      if(data.name) {
        item.list.forEach(el => {
          dispatch('products/changeCountById', {id: el.productId, count: el.count}, { root: true })
        })
        commit('cart/clearCart', {}, { root: true })
      }
    },
    async getCurrentOrder({commit}, item) {
      commit('setCurrentOrder', {})
      commit('setLoading', true)
      const url = `/orders/${item}.json`
      const {data} = await requestAxios.get(url)
      if(data) {
        await commit('setCurrentOrder', data)
      }
      commit('setLoading', false)
    }
  },
  getters: {
    orders(state) {
      return state.orders
    },
    loading(state) {
      return state.loading
    },
    currentOrder(state) {
      return state.currentOrder
    }
  }
}