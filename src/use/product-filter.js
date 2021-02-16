import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export function useProductFilter() {
	const store = useStore()
	const route = useRoute()

	const filter = ref({
			search: route.query.search ?? '',
			category: route.query.category ?? '',
			page: route.query.page ?? '1'
	})

	const products = computed(() => store.getters['products/products'])
	const loading = computed(() => store.getters['products/loading'])
	const categories = computed(() => store.getters['categories/categories'])
	const show = computed(() => products.value.length)

	watch(filter, (filter) => {
		store.commit('products/setFilter', filter)
	})

	onMounted(() => {
		store.commit('products/setFilter', filter)
	})

	return {
		show,
		filter,
		categories,
		products,
		loading,
	}
}
