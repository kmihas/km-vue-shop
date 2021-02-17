import { onMounted } from 'vue'
import { useStore } from 'vuex'

export function useLoadEnter() {
	const store = useStore()

	const load = async () => {
		if (store.getters['categories/categoriesCount'] === 0) {
			await store.dispatch('categories/getCategories')
		}
		if (store.getters['products/productsCount'] === 0) {
			await store.dispatch('products/getProducts')
		}
	}

	onMounted(() => {
		load()
	})

	return
}