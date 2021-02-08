<template>
	<div class="row col s12">
		<shop-filter
			:categoryes="categoryes"
			:category="category"
			@search="search"
			@changecat="changeCategory"
		/>
		<shop-page :products="products" :loader="loading" />
	</div>
</template>

<script>
import ShopFilter from '../components/shop/ShopFilter'
import ShopPage from '../components/shop/ShopPage'
import { useShop } from '../use/shop'

export default {
	name: 'Shop',
	setup() {
		return {
			...useShop(),
		}
	},
	components: {
		ShopPage,
		ShopFilter,
	},
}
</script>

<style scoped>
.row {
	margin: 0 auto;
}
</style>
