<template>
	<div class="card">
		<div class="card-content">
			<CartTitle :cartClear="!cartClear" />
			<div class="page product-loader" v-if="loading">
				<AppLoader />
			</div>
			<div v-else>
				<CartTable v-if="cartClear" :cartProducts="cartProducts" :cart="cart" />
			</div>
		</div>
		<div class="card-action right-align" v-if="cartClear && !loading">
			<button class="btn blue-grey darken-2 waves-effect">
				Оплатить
			</button>
		</div>
	</div>
</template>

<script>
import CartTable from '../components/cart/CartTable'
import CartTitle from '../components/cart/CartTitle'
import AppLoader from '../components/ui/AppLoader'
import { useCart } from '../use/cart'

export default {
	name: 'Cart',
	setup() {
		return {
			...useCart(),
		}
	},
	components: {
		CartTable,
		CartTitle,
		AppLoader,
	},
}
</script>

<style scoped>
.card {
	margin: 0 auto;
	width: 920px;
}
</style>
