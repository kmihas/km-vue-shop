<template>
	<h4>Перечень товаров</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<suspense>
			<AdminProductsTable :products="products" :categories="categories" />
		</suspense>
		<div class="center-align">
			<AppPagination :curr="+pageCurr" :last="+pageLast" v-if="show" />
		</div>
	</div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AdminProductsTable from './AdminProductsTable'
import AppPagination from '../ui/AppPagination'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'AdminsProducts',
	setup() {
		const store = useStore()
		const route = useRoute()
		const categories = computed(() => store.getters['categories/categories'])
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])
		const countProducts = computed(
			() => store.getters['products/productsFiltered'].length
		)
		const perPage = computed(() => store.getters['products/perPage'])
		const pageCurr = computed(() => route.query.page ?? 1)
		const pageLast = computed(() => {
			return Math.ceil(countProducts.value / perPage.value)
		})
		const show = computed(() => products.value.length)

		watch(pageCurr, (newVal) => {
			store.commit('products/setPage', newVal)
		})

		const load = async () => {
			await store.dispatch('categories/getCategories')
			await store.dispatch('products/getProducts')
		}

		onMounted(() => {
			load()
		})

		return {
			loading,
			products,
			categories,
			pageCurr,
			pageLast,
			show,
		}
	},
	components: {
		AdminProductsTable,
		AppPagination,
		AppLoader,
	},
}
</script>
