<template>
	<div class="container col s10 m10 x10">
		<div class="page product-loader" v-if="loader">
			<AppLoader />
		</div>
		<div class="page" v-else>
			<ShopProductCard
				v-for="item in products"
				:key="item.id"
				:product="item"
			/>
		</div>
		<div class="center-align" v-if="!loader">
			<AppPagination />
		</div>
	</div>
</template>

<script>
import ShopProductCard from './ShopProductCard'
import AppPagination from '../ui/AppPagination'
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
		AppPagination,
		AppLoader,
	},
}
</script>

<style scoped>
.page {
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
