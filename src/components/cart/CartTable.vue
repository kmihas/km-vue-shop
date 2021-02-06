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
					<button
						class="btn-small blue-grey darken-2"
						@click.prevent="countDown(item.id)"
					>
						-
					</button>
					<span class="prodcount">{{ cart[item.id] }}</span>
					<button
						class="btn-small blue-grey darken-2"
						@click.prevent="countUp(item.id)"
					>
						+
					</button>
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
export default {
	props: {
		cartProducts: {
			type: Object,
		},
		cart: {
			type: Object,
		},
	},
	emits: ['countUp', 'countDown'],
	setup(props, context) {
		const total = computed(() => {
			return Object.keys(props.cartProducts).reduce((acc, id) => {
				const item = props.cartProducts[id]
				return (acc += item.price * props.cart[item.id])
			}, 0)
		})

		const countUp = (id) => {
			context.emit('countUp', id)
		}
		const countDown = (id) => {
			context.emit('countDown', id)
		}

		return {
			total,
			countUp,
			countDown,
		}
	},
}
</script>

<style scoped>
.prodcount {
	padding: 1.5rem;
}
</style>
