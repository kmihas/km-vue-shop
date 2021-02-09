<template>
	<button
		class="btn-small blue-grey darken-2 waves-effect"
		:disabled="!product.count"
		v-if="!count"
		@click.prevent="addToCart(product.id)"
	>
		В корзину
	</button>
	<div v-else>
		<AppCountUpDown :productId="+product.id" :count="+count" />
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppCountUpDown from './AppCountUpDown'

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
		AppCountUpDown,
	},
}
</script>
