<template>
	<h4>Перечень товаров</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<AdminProductsTable :products="products" :categories="categories" />
		<div class="center-align">
			<AppPagination />
		</div>
	</div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminProductsTable from './AdminProductsTable'
import AppPagination from '../ui/AppPagination'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'AdminsProducts',
	setup() {
		const store = useStore()
		const categories = computed(() => store.getters['categories/categories'])
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])

		onMounted(() => {
			store.dispatch('categories/getCategories')
			store.dispatch('products/getProducts')
		})
		return {
			loading,
			products,
			categories,
		}
	},
	components: {
		AdminProductsTable,
		AppPagination,
		AppLoader,
	},
}
</script>
