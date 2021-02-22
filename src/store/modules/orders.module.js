import requestAxios from '../../axios/request'

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
      loading: false
    }
  },
  mutations: {
    setLoading(state, item) {
      state.loading = item
    },
    setOrders(state, item) {
      state.orders = item
    }
  },
  actions: {
    getOrders({commit}) {
      // commit('setLoading', true)
      // const url = `/orders/${item}.json`
      // const {data} = await requestAxios.get(url)
      // await commit('setOrders', {
      //   id: item,
      //   ...data.data
      // })
      // await commit('setLoading', false)
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
    }
  },
  getters: {
    orders(state) {
      return state.orders
    },
    loading(state) {
      return state.loading
    }
  }
}