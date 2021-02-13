<template>
	<h4>Категории товаров</h4>
	<AdminCategoryesTable :categoryes="categoryes" />
	<AppPagination />
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminCategoryesTable from './AdminCategoryesTable'
import AppPagination from '../ui/AppPagination'

export default {
	name: 'AdminCategoryes',
	setup() {
		const store = useStore()
		const categoryes = computed(() => store.getters['categoryes/categoryes'])

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
		})

		return {
			categoryes,
		}
	},
	components: {
		AdminCategoryesTable,
		AppPagination,
	},
}
</script>
