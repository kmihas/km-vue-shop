<template>
	<div class="row">
		<div class="col s12">
			<div class="card small">
				<div class="card-image">
					<img :src="product.img" />
				</div>
				<div class="card-title">
					<span class="">{{ product.title }}</span>
				</div>
				<div class="card-action">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
import AppCountUpDown from '../ui/AppCountUpDown'

export default {
	props: {
		product: {
			type: Object,
			requared: true,
		},
	},
	setup(props) {
		const store = useStore()
		const cart = inject('cart')

		const count = computed(() => {
			return cart.value[props.product.id] ? cart.value[props.product.id] : 0
		})

		const addToCart = (id) => {
			store.commit('cart/addToCart', id)
		}

		const countUp = (id) => {
			store.commit('cart/upProductCount', id)
		}

		const countDown = (id) => {
			store.commit('cart/downProductCount', id)
		}

		return {
			count,
			addToCart,
			countUp,
			countDown,
		}
	},
	components: {
		AppCountUpDown,
	},
}
</script>

<style lang="scss" scoped>
.row {
	width: 200px;
	margin: 0.1rem;
	text-align: center;
}

.prodcount {
	padding: 1rem;
}
</style>
