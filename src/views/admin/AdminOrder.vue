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
			<div class="card" v-if="order && usersMail">
				<div class="card-content">
					<div class="card-title">Заказ id: "{{ id }}"</div>
					<p>Дата заказа: {{ getDate(order.date) }}</p>
					<p>e-mail заказчика: {{ usersMail[order.userId] }}</p>
					<p>Корзина заказа:</p>
					<div>
						<table>
							<thead>
								<tr>
									<th>Название</th>
									<th>Кол-во</th>
									<th>Цена</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in order.list" :key="item.id">
									<td>{{ productsName[item.productId] }}</td>
									<td>{{ item.count }}</td>
									<td>{{ item.price }}</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td></td>
									<td class="right-align">Всего:</td>
									<td>{{ total }} руб.</td>
								</tr>
							</tfoot>
						</table>
					</div>
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
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

export default {
	name: 'AdminOrder',
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const id = route.params.id
		const isLoading = computed(() => {
			return (
				store.getters['orders/loading'] && store.getters['products/loading']
			)
		})
		const order = computed(() => store.getters['orders/currentOrder'])
		const usersMail = computed(() => store.getters['users/usersMail'])
		const productsName = computed(() => store.getters['products/productsName'])

		const total = computed(() => {
			if (Array.isArray(order.value.list)) {
				return order.value.list.reduce((acc, item) => {
					return (acc += item.count * item.price)
				}, 0)
			} else {
				return '-'
			}
		})

		const getDate = (date) => {
			return new Date(+date).toLocaleString()
		}

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
			getDate,
			usersMail,
			productsName,
			total,
		}
	},
	components: {
		AppLoader,
	},
}
</script>
