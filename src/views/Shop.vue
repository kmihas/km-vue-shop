<template>
	<div class="row col s12">
		<shop-filter
			:categoryes="categoryes"
			:category="category"
			@search="search"
			@changecat="changeCategory"
		/>
		<shop-page :products="products" :loader="loading" />
	</div>
</template>

<script>
import ShopFilter from '../components/shop/ShopFilter'
import ShopPage from '../components/shop/ShopPage'
import { computed, ref, provide, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
	name: 'Shop',
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const categoryes = computed(() => store.getters['categoryes/categoryes'])
		const category = ref('')
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])
		const cart = computed(() => store.getters['cart/cart'])

		provide('cart', cart)

		const search = (string) => {
			const url = `${route.path}?q=${string}&category=${category.value}`
			router.push(url)
		}

		const changeCategory = (cat) => {
			category.value = cat
			const string = route.query.q ? route.query.q : ''
			const url = `${route.path}?q=${string}&category=${category.value}`
			router.push(url)
		}

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
			store.dispatch('products/getProducts')
			if (route.query.category) {
				category.value = route.query.category
			} else {
				category.value = 'all'
			}
		})

		return {
			search,
			category,
			categoryes,
			changeCategory,
			products,
			loading,
		}
	},
	components: {
		ShopPage,
		ShopFilter,
	},
}
</script>

<style scoped>
.row {
	margin: 0 auto;
}
</style>
