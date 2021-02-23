<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Дата заказа</th>
				<th>e-mail пользователя</th>
				<th>Товаров в заказе</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="item in orders" :key="item.id">
				<td></td>
				<td>{{ getDate(+item.date) }}</td>
				<td>{{ usersMail[item.userId] }}</td>
				<td>{{ item.list.length }}</td>
				<td>
					<router-link :to="`/admin/order/${item.id}`">
						<i class="material-icons">
							more
						</i>
					</router-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'AdminOrdersList',
	props: {
		orders: {
			type: Array,
		},
	},
	setup(props) {
		const store = useStore()
		const usersMail = computed(() => store.getters['users/usersMail'])

		const getDate = (date) => {
			const out = new Date(+date)
			return out.toLocaleString()
		}

		onBeforeMount(() => {
			const usersId = []
			props.orders.forEach((el) => {
				usersId.push(el.userId)
			})
			store.dispatch('users/getUsersMail', [...new Set(usersId)])
		})

		return {
			getDate,
			usersMail,
		}
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
	color: black;
}
</style>
