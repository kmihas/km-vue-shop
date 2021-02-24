<template>
	<div class="row col s12">
		<AppFilterForm :categories="categories" v-model="filter" />
		<ShopProductList :products="products" :loader="loading" />
	</div>
</template>

<script>
import AppFilterForm from '@/components/AppFilterForm'
import ShopProductList from '@/components/shop/ShopProductList'
import { useProductFilter } from '@/use/product-filter'
import { useLoadEnter } from '@/use/load-enter'

export default {
	name: 'Shop',
	setup() {
		return {
			...useLoadEnter(),
			...useProductFilter(),
		}
	},
	components: {
		ShopProductList,
		AppFilterForm,
	},
}
</script>

<style scoped>
.row {
	margin: 0 auto;
}
</style>
