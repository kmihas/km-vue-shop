<template>
	<div v-if="product.count">
		<button
			class="btn-small blue-grey darken-2 waves-effect"
			v-if="!count"
			@click.prevent="addToCart(product.id)"
		>
			В корзину
		</button>
		<div v-else>
			<AppAmount :productId="+product.id" :count="+count" />
		</div>
	</div>
	<div v-else>
		Товар отсутствует
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppAmount from './AppAmount'

export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const store = useStore()
		const cart = computed(() => store.getters['cart/cart'])
		const count = computed(() => {
			return cart.value[props.product.id] ? cart.value[props.product.id] : 0
		})

		const addToCart = (id) => {
			store.commit('cart/addToCart', id)
			store.dispatch('cart/getCartProducts')
		}

		return {
			addToCart,
			count,
		}
	},
	components: {
		AppAmount,
	},
}
</script>
