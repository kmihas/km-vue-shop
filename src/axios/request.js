import axios from 'axios'
import store from '../store/modules/auth.module'

const token = store.getters['auth/token']
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})
requestAxios.defaults.headers.common[TOKEN_KEY] = token

export default requestAxios