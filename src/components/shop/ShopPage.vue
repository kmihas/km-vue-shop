<template>
	<div class="container col s10 m10 x10">
		<div class="card product-loader" v-if="loader">
			<app-loader />
		</div>
		<div class="card" v-else>
			<shop-product-card
				v-for="item in products"
				:key="item.id"
				:product="item"
			/>
		</div>
		<shop-pagination v-if="!loader" />
	</div>
</template>

<script>
import ShopProductCard from './ShopProductCard'
import ShopPagination from './ShopPagination'
import AppLoader from '../ui/AppLoader'

export default {
	name: 'ShopPage',
	props: {
		products: {
			type: Array,
			requared: true,
			default: [],
		},
		loader: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		return {}
	},
	components: {
		ShopProductCard,
		ShopPagination,
		AppLoader,
	},
}
</script>

<style scoped>
.card {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	min-height: 20rem;
}

.product-loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
