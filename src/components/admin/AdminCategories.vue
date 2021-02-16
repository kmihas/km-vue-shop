<template>
	<h4>Список категорий</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<AdminCategoriesTable :categories="categories" />
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AdminCategoriesTable from './AdminCategoriesTable'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'AdminCategories',
	setup() {
		const store = useStore()
		const loading = computed(() => store.getters['categories/loading'])
		const categories = computed(() => store.getters['categories/categories'])

		return {
			categories,
			loading,
		}
	},
	components: {
		AdminCategoriesTable,
		AppLoader,
	},
}
</script>
