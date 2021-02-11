<template>
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const layout = computed(() => route.meta.layout)

		onBeforeMount(() => {
			store.dispatch('cart/getCartProducts')
		})

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
	justify-content: space-around;
	flex-wrap: wrap;
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
