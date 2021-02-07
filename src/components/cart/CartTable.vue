<template>
	<table class="highlight">
		<thead>
			<tr>
				<th>Наименование</th>
				<th>Количество</th>
				<th>Цена (шт)</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in cartProducts" :key="item.id">
				<td>{{ item.title }}</td>
				<td>
					<AppCountUpDown :productId="+item.id" :count="+cart[item.id]" />
					шт.
				</td>
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
</template>

<script>
import { computed } from 'vue'
import AppCountUpDown from '../ui/AppCountUpDown'

export default {
	name: 'CartTable',
	props: {
		cartProducts: {
			type: Object,
		},
		cart: {
			type: Object,
		},
	},
	setup(props) {
		const total = computed(() => {
			return Object.keys(props.cartProducts).reduce((acc, id) => {
				const item = props.cartProducts[id]
				return (acc += item.price * props.cart[item.id])
			}, 0)
		})

		return {
			total,
		}
	},
	components: {
		AppCountUpDown,
	},
}
</script>

<style scoped>
.prodcount {
	padding: 1rem;
}
</style>
