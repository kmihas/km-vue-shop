<template>
	<div class="row col s12">
		<h4>Перечень товаров</h4>
		<ShopFilterForm :categories="categories" v-model="filter" />
		<div class="page product-loader" v-if="loading">
			<AppLoader />
		</div>
		<div v-else>
			<AdminProductsTable :products="products" :categories="categories">
				<AppPagination
					class="center-align"
					:curr="+pageCurr"
					:last="+pageLast"
					v-if="show"
				/>
			</AdminProductsTable>
		</div>
		<div class="center-align" v-if="!show ?? !loading">
			<h5>
				Товаров указанных в поиске нет.
			</h5>
		</div>
	</div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useProductFilter } from '../../use/product-filter'
import AdminProductsTable from './AdminProductsTable'
import AppPagination from '../ui/AppPagination'
import AppLoader from '../ui/AppLoader'
import ShopFilterForm from '../shop/ShopFilterForm'

export default {
	name: 'AdminsProducts',
	setup() {
		const store = useStore()
		const route = useRoute()

		const countProducts = computed(
			() => store.getters['products/productsFiltered'].length
		)
		const perPage = computed(() => store.getters['products/perPage'])
		const pageCurr = computed(() => route.query.page ?? 1)
		const pageLast = computed(() => {
			return Math.ceil(countProducts.value / perPage.value)
		})

		watch(pageCurr, (newVal) => {
			store.commit('products/setPage', newVal)
		})

		return {
			pageCurr,
			pageLast,
			...useProductFilter(),
		}
	},
	components: {
		AdminProductsTable,
		AppPagination,
		AppLoader,
		ShopFilterForm,
	},
}
</script>
