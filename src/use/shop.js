import { computed, onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useShop() {
		const TIMER = process.env.VUE_APP_TIMER_SEC
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const timer = ref('')
		const searchString = computed(() => {
			return route.query.q ? route.query.q : ''
		})
		const category = computed(() => {
			return route.query.category ? route.query.category : 'all'
		})

		const categoryes = computed(() => store.getters['categoryes/categoryes'])
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])
		const cart = computed(() => store.getters['cart/cart'])

    provide('cart', cart)

		const search = async (string) => {
			await router.push(`${route.path}?q=${string}&category=${category.value}`)
			searchProducts(TIMER)
		}

		const changeCategory = async (cat) => {
			await router.push(`${route.path}?q=${searchString.value}&category=${cat}`)
			searchProducts()
		}

		const searchProducts = (sec) => {
			clearTimeout(timer.value)
			timer.value = setTimeout(() => {
				store.dispatch('products/getProducts', {
					search: `${searchString.value}`,
					category: `${category.value}`,
				})
			}, sec)
		}

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
			store.dispatch('products/getProducts')
		})

		return {
			search,
			category,
			categoryes,
			changeCategory,
			products,
			loading,
		}
}