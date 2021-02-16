<template>
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

export default {
	setup() {
		const route = useRoute()
		const layout = computed(() => route.meta.layout)

		return {
			layout,
		}
	},
	components: {
		MainLayout,
		AuthLayout,
		AdminLayout,
	},
}
</script>

<style>
.page {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	min-height: 20rem;
}
.product-loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
.img-table-preview {
	width: 24px;
	height: 24px;
}
</style>
