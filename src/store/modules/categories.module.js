import requestAxios from '@/axios/request'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
    async saveCategoryById({commit}, item) {
      const url = `/categories/${item.id}.json`
      const body = {...item}
      delete body.id
      const {data} = await requestAxios.put(url, body)
      if(data) {
        toast.success("Сохранено")
      }
    },
    async saveCategory({commit}, item) {
      const url = '/categories.json'
      const {data} = await requestAxios.post(url, item)
      if(data) {
        toast.success("Сохранено")
      }
    },
    async deleteCategory({commit}, item) {
      const url = `/categories/${item}.json`
      const data = await requestAxios.delete(url)
      if(data) {
        toast.info("Удалено")
      }
    }
  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoriesCount(state) {
      return state.categories.length
    },
    loading(state) {
      return state.loading
    }
  }
}