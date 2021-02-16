import { onMounted } from 'vue'
import { useStore } from 'vuex'

export function useLoadEnter() {
	const store = useStore()

	const load = async () => {
		await store.dispatch('categories/getCategories')
		await store.dispatch('products/getProducts')
	}

	onMounted(() => {
		load()
	})

	return
}