import axios from 'axios'
import requestAxios from '../../axios/request'
import { error } from '../../utils/error'
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const TOKEN_DATA = process.env.VUE_APP_TOKEN_DATA
const LOCAL_USER = process.env.VUE_APP_LOCAL_USER
const APIKEY = process.env.VUE_APP_APIKEY

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY) ?? '',
      tokenData: JSON.parse(localStorage.getItem(TOKEN_DATA)) ?? {},
      user: JSON.parse(localStorage.getItem(LOCAL_USER)) ?? {},
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data.idToken
      localStorage.setItem(TOKEN_KEY, data.idToken)
      state.tokenData = {
        email: data.email ?? '',
        localId: data.localId ?? '',
        refreshToken: data.refreshToken ?? '',
        expiresData: data.expiresData ?? '',
      }
      localStorage.setItem(TOKEN_DATA, JSON.stringify(state.tokenData))
    },
    setUser(state, item) {
      state.user = item
      localStorage.setItem(LOCAL_USER, JSON.stringify(item))
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_DATA)
      localStorage.removeItem(LOCAL_USER)
    }
  },
  actions: {
    async login({commit, dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        data.expiresData = Date.now() + (+data.expiresIn * 1000)
        commit('setToken', data)
        dispatch('getUser', data.localId)
      } catch (e) {
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
    async getUser({commit}, id) {
        const url = `/users/${id}.json`
        const {data} = await requestAxios.get(url)
        commit('setUser', {...data, id})
    },
    async updateToken ({commit}) {

    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAutenticated(_, getters) {
      return !!getters.token && !getters.tokenExpired
    },
    tokenExpired(state) {
      return Date.now() >= state.tokenData.expiresData
    },
    isAdmin(state) {
      return state.user.role === 'admin'
    }
  }
}