<template>
	<h4>Список заказов</h4>
	<div class="page product-loader" v-if="loading">
		<AppLoader />
	</div>
	<div v-else>
		<AdminOrdersList :orders="orders" />
	</div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AdminOrdersList from '@/components/admin/AdminOrdersList'
import AppLoader from '@/components/ui/AppLoader'

export default {
	name: 'AdminOrders',
	setup() {
		const store = useStore()
		const loading = computed(() => store.getters['orders/loading'])
		const orders = computed(() => store.getters['orders/orders'])

		onBeforeMount(() => {
			store.dispatch('orders/getOrders')
		})

		return {
			orders,
			loading,
		}
	},
	components: {
		AdminOrdersList,
		AppLoader,
	},
}
</script>
