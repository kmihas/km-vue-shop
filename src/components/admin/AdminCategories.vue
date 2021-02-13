<template>
	<h4>Категории категорий</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<AdminCategoriesTable :categories="categories" />
		<div class="center-align">
			<AppPagination />
		</div>
	</div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminCategoriesTable from './AdminCategoriesTable'
import AppPagination from '../ui/AppPagination'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'AdminCategories',
	setup() {
		const store = useStore()
		const loading = computed(() => store.getters['categories/loading'])
		const categories = computed(() => store.getters['categories/categories'])
		onMounted(() => {
			store.dispatch('categories/getCategories')
		})
		return {
			categories,
			loading,
		}
	},
	components: {
		AdminCategoriesTable,
		AppPagination,
		AppLoader,
	},
}
</script>
