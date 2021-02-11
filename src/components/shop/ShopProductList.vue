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
		<AppPagination v-if="!loader" />
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
