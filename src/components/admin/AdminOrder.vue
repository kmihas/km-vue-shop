<template>
	<div class="container">
		<div class="" v-if="id">
			<a class="btn-floating blue-grey darken-3" @click.prevent="onBack">
				<i class="material-icons">arrow_back</i>
			</a>
		</div>
		<div v-if="isLoading">
			<AppLoader />
		</div>
		<div v-else class="col s12 m6">
			<div class="card" v-if="order">
				<div class="card-content">
					<div class="card-title">Заголовок для заказа {{ id }}</div>
					<p>Lorem ipsum dolor sit amet consectetur</p>
					<p>В наличии:</p>
					<p>Цена:</p>
				</div>
			</div>
			<div v-else>
				<h3 class="center-align">
					Товар не найден.
				</h3>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'AdminOrder',
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const id = computed(() => route.params.id)
		const isLoading = computed(() => store.getters['orders/loading'])
		const order = computed(() => store.getters['orders/currentOrder'])

		const onBack = () => {
			router.back()
		}

		onBeforeMount(() => {
			store.dispatch('orders/getCurrentOrder', id.value)
		})

		return {
			id,
			onBack,
			isLoading,
			order,
		}
	},
	components: {
		AppLoader,
	},
}
</script>
