<template>
	<div class="card">
		<div class="card-content">
			<cart-title :cartClear="cartClear" />
			<cart-table
				v-if="!cartClear && !loading"
				:cartProducts="cartProducts"
				:cart="cart"
				@countUp="countUp"
				@countDown="countDown"
			/>
			<app-loader v-if="loading" />
		</div>
		<div class="card-action right-align" v-if="!cartClear && !loading">
			<button class="btn blue-grey darken-2 waves-effect">
				Оплатить
			</button>
		</div>
	</div>
</template>

<script>
import CartTable from '../components/cart/CartTable'
import CartTitle from '../components/cart/CartTitle'
import AppLoader from '../components/AppLoader'
import { useCart } from '../use/cart'

export default {
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
