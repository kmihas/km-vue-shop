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
