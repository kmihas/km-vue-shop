<template>
	<div class="row">
		<div class="col s12">
			<div class="card small">
				<router-link :to="{ path: `/product/${product.id}` }">
					<div class="card-image">
						<img :src="product.img" />
					</div>
				</router-link>
				<div class="card-title">
					<span class="">{{ product.title }}</span>
				</div>
				<div class="card-action">
					<AppAddCart
						:id="product.id"
						:count="+product.count"
						:cartCount="+count"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue'
import AppAddCart from '../ui/AppAddCart'
import { useStore } from 'vuex'

export default {
	props: {
		product: {
			type: Object,
			requared: true,
		},
	},
	setup(props) {
		const store = useStore()
		const cart = computed(() => store.getters['cart/cart'])
		const count = computed(() => {
			return cart.value[props.product.id] ? cart.value[props.product.id] : 0
		})

		return {
			count,
		}
	},
	components: {
		AppAddCart,
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
