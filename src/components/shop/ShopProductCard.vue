<template>
	<div class="row">
		<div class="col s12">
			<div class="card">
				<router-link :to="{ path: `/product/${product.id}` }">
					<div class="card-image">
						<img :src="product.img" />
					</div>
				</router-link>
				<div class="card-title">
					<p class="small">{{ product.title }}</p>
					<p class="small">в наличии: {{ product.count }}</p>
					<p class="small">Цена: {{ product.price }}</p>
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
	width: 15rem;
	margin: 0.1rem;
	text-align: center;
}

.small {
	font-size: 1rem;
}

.row p {
	margin: 0;
}

.prodcount {
	padding: 1rem;
}
</style>
