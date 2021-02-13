<template>
	<h4>Перечень товаров</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
<<<<<<< HEAD
	<div v-else>
		<AdminProductsTable :products="products" :categories="categories" />
		<div class="center-align">
			<AppPagination />
		</div>
	</div>
=======
	<AdminProductsTable
		:products="products"
		:categoryes="categoryes"
		v-if="!loading"
	/>
	<AppPagination v-if="!loading" />
>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
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
<<<<<<< HEAD
		const categories = computed(() => store.getters['categories/categories'])
=======
		const categoryes = computed(() => store.getters['categoryes/categoryes'])
>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
		const products = computed(() => store.getters['products/products'])
		const loading = computed(() => store.getters['products/loading'])

		onMounted(() => {
<<<<<<< HEAD
			store.dispatch('categories/getCategories')
			store.dispatch('products/getProducts')
		})
		return {
			loading,
			products,
			categories,
=======
			store.dispatch('categoryes/getCategoryes')
			store.dispatch('products/getProducts')
		})

		return {
			loading,
			products,
			categoryes,
>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
		}
	},
	components: {
		AdminProductsTable,
		AppPagination,
		AppLoader,
	},
}
</script>
