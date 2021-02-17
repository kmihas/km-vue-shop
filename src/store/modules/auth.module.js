import axios from 'axios'
import { error } from '../../utils/error'
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const APIKEY = process.env.VUE_APP_APIKEY

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY) ?? ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state, token) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login({commit}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
      } catch (e) {
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAutenticated(_, getters) {
      return !!getters.token
    }
  }
}