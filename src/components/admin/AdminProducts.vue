<template>
	<h4>Перечень товаров</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<AdminProductsTable
		:products="products"
		:categoryes="categoryes"
		v-if="!loading"
	/>
	<AppPagination v-if="!loading" />
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
		const categoryes = computed(() => store.getters['categoryes/categoryes'])
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
			store.dispatch('products/getProducts')
		})

		return {
			loading,
			products,
			categoryes,
		}
	},
	components: {
		AdminProductsTable,
		AppPagination,
		AppLoader,
	},
}
</script>
