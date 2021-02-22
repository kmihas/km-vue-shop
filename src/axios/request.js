import axios from 'axios'
import store from '../store/modules/auth.module'

const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

requestAxios.defaults.params = {}

requestAxios.interceptors.request.use( async config => {
    config.params['auth'] = store.getters['auth/token']

    if (!store.getters['auth/isAuthenticated']) {
        return config
    }
    if (store.getters['auth/needUpdateToken']) {
        await store.dispatch('auth/updateToken')
    }

    return config
})

requestAxios.interceptors.response.use(null , error => {
    if(error.response.status === 401) {
        store.commit('auth/logout')
    }
    return Promise.reject(error)
})

export default requestAxios