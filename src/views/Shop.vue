<template>
	<div class="row col s12">
		<ShopFilter
			:categoryes="categoryes"
			:category="category"
			@search="search"
			@changecat="changeCategory"
		/>
		<ShopProductList :products="products" :loader="loading" />
	</div>
</template>

<script>
import ShopFilter from '../components/shop/ShopFilter'
import ShopProductList from '../components/shop/ShopProductList'
import { useShop } from '../use/shop'

export default {
	name: 'Shop',
	setup() {
		return {
			...useShop(),
		}
	},
	components: {
		ShopProductList,
		ShopFilter,
	},
}
</script>

<style scoped>
.row {
	margin: 0 auto;
}
</style>
