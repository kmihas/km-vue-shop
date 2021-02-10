import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useShop() {
		const TIMER = process.env.VUE_APP_TIMER_SEC
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const timer = ref('')
		const searchString = ref(route.query.search || '')
		const category = ref(route.query.category || '')

		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])
		const categoryes = computed(() => store.getters['categoryes/categoryes'])

		const search = async (string) => {
			searchString.value = string
			searchProducts(TIMER)
		}

		const changeCategory = async (cat) => {
			category.value = cat
			searchProducts()
		}

		const searchProducts = (sec) => {
			clearTimeout(timer.value)
			timer.value = setTimeout(() => {
				store.dispatch('products/getProducts', {
					search: searchString.value,
					category: category.value,
				})
			}, sec)
		}

		watch([searchString, category], ([searchString, category]) => {
			const query = {}
			if(searchString) {
				query.search = searchString
			}
			if(category) {
				query.category = category
			}
			router.replace({query})
		})

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
			searchProducts()
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