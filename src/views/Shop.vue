<template>
	<div class="row col s12">
		<ShopFilterForm :categories="categories" v-model="filter" />
		<ShopProductList :products="products" :loader="loading" />
	</div>
</template>

<script>
import ShopFilterForm from '../components/shop/ShopFilterForm'
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
		ShopFilterForm,
	},
}
</script>

<style scoped>
.row {
	margin: 0 auto;
}
</style>
