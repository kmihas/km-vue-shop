import axios from 'axios'
import requestAxios from '../../axios/request'
import { error } from '../../utils/error'
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const LOCAL_USER = process.env.VUE_APP_LOCAL_USER
const APIKEY = process.env.VUE_APP_APIKEY

export default {
  namespaced: true,
  state() {
    return {
      token: JSON.parse(localStorage.getItem(TOKEN_KEY)) ?? {},
      user: JSON.parse(localStorage.getItem(LOCAL_USER)) ?? {},
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = {
        idToken: data.idToken ?? '',
        refreshToken: data.refreshToken ?? '',
        expiresData: data.expiresData ?? '',
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(state.token))
    },
    setUser(state, item) {
      state.user = item
      localStorage.setItem(LOCAL_USER, JSON.stringify(item))
    },
    logout(state) {
      state.token = {}
      state.user = {}
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(LOCAL_USER)
    }
  },
  actions: {
    async signIn({commit, dispatch}, payload) {
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
      try {
        const url = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`
        const {data} = await axios.post(url, {
          grant_type: 'refresh_token',
          refresh_token: state.token.refreshToken
        })
        commit('setToken', {
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresData: (Date.now() + (+data.expires_in * 1000)),
        })
      } catch (e) {
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
    async signUp({commit, dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        data.expiresData = Date.now() + (+data.expiresIn * 1000)
        commit('setToken', data)
        await dispatch('createUser', data)
      } catch (e) {
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
    async createUser({dispatch}, payload) {
      try {
        const url = `/users/${payload.localId}.json`
        await requestAxios.put(url, {email: payload.email, role: 'user'})
        dispatch('getUser', payload.localId)
      } catch (e) {
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    }
  },
  getters: {
    token(state) {
      return state.token.idToken
    },
    isAutenticated(_, getters) {
      return !!getters.token && !getters.tokenExpired
    },
    tokenExpired(state) {
      return Date.now() >= state.token.expiresData
    },
    isAdmin(state) {
      return state.user.role === 'admin'
    },
    userEmail(state) {
      return state.user.email ?? ''
    },
    userId(state) {
      return state.user.id ?? ''
    }
  }
}