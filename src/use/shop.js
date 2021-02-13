import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export function useShop() {
	const store = useStore()
	const route = useRoute()

	const filter = ref({
		search: route.query.search ?? '',
		category: route.query.category ?? ''
	})

	const products = computed(() => store.getters['products/products'])
	const loading = computed(() => store.getters['products/loading'])
	const categories = computed(() => store.getters['categories/categories'])

	watch(filter, (filter) => {
		store.commit('products/setFilter', filter)
	})

	onMounted(() => {
		store.dispatch('categories/getCategories')
		store.dispatch('products/getProducts')
	})

	return {
		filter,
		categories,
		products,
		loading,
	}
}
