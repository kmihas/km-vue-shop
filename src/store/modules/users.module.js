import requestAxios from '@/axios/request'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {
  namespaced: true,
  state() {
    return {
      usersMail: {}
    }
  },
  mutations: {
    setUsersMail(state, item) {
      state.orders = item
    },
    addUsersMail(state, item) {
      state.usersMail[item.id] = item.email
    }
  },
  actions: {
    async getUsersMail({dispatch, commit}, item) {
      commit('setUsersMail', {})
			const count = item.length
			let i = 0
			setInterval(() => {
        if (i < count) {
          dispatch('getMail', item[i])
          i++
				} else {
          return
				}
			}, process.env.VUE_APP_REQUEST_TIMEOUT)
    },
    async getMail({commit}, item) {
      const url = `/users/${item}.json`
      const {data} = await requestAxios.get(url)
      commit('addUsersMail', {
        id: item,
        email: data.email
      })
    }
  },
  getters: {
    usersMail(state) {
      return state.usersMail
    }
  }
}