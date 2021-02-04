<template>
	<div class="card card-content">
		<div class="card-content">
			<span class="card-title">
				<h4 class="text-center" v-if="cartClear">В корзине пока ничего нет</h4>
				<h4 class="text-center" v-else>Корзина</h4>
			</span>

			<table class="highlight">
				<thead>
					<tr>
						<th>Наименование</th>
						<th>Количество</th>
						<th>Цена (шт)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Название товара</td>
						<td>
							<button class="btn blue-grey darken-2">+</button>
							<span>42</span>
							<button class="btn blue-grey darken-2">-</button>
							шт.
						</td>
						<td>42 000 руб.</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td class="right-align">Всего:</td>
						<td>14 200 руб.</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="card-action right-align">
			<button class="btn blue-grey darken-2 waves-effect">
				Оплатить
			</button>
		</div>
	</div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
	setup() {
		const CART_MODEL = reactive({
			'2': 3,
			'5': 1,
		})

		const store = useStore()

		const products = computed(() => {
			return store.getters['products/products']
		})

		const cartClear = computed(() => {
			return Object.keys(CART_MODEL).length ? false : true
		})

		return {
			CART_MODEL,
			cartClear,
		}
	},
}
</script>
