<template>
	<h4>Список категорий</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<AdminCategoriesList :categories="categories" />
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AdminCategoriesList from '@/components/admin/AdminCategoriesList'
import AppLoader from '@/components/ui/AppLoader'

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
		AdminCategoriesList,
		AppLoader,
	},
}
</script>
