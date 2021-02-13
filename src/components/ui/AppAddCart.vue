<template>
	<div v-if="count">
		<button
			class="btn-small blue-grey darken-2 waves-effect"
			v-if="!cartCount"
			@click.prevent="addToCart(id)"
		>
			В корзину
		</button>
		<div v-else>
			<AppAmount :productId="id" :count="+cartCount" />
		</div>
	</div>
	<div v-else>
		Товар отсутствует
	</div>
</template>

<script>
import { useStore } from 'vuex'
import AppAmount from './AppAmount'

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
		cartCount: {
			type: Number,
			required: true,
		},
	},
	setup() {
		const store = useStore()

		const addToCart = (id) => {
			store.commit('cart/addToCart', id)
		}

		return {
			addToCart,
		}
	},
	components: {
		AppAmount,
	},
}
</script>
