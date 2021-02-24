<template>
	<div class="row col s12">
		<h4>Перечень товаров</h4>
		<AppFilterForm :categories="categories" v-model="filter" />
		<div class="page product-loader" v-if="loading">
			<AppLoader />
		</div>
		<div v-else>
			<AdminProductsList :products="products" :categories="categories">
				<AppPagination
					class="center-align"
					:curr="+pageCurr"
					:last="+pageLast"
					v-if="show"
				/>
			</AdminProductsList>
		</div>
	</div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useProductFilter } from '@/use/product-filter'
import AdminProductsList from '@/components/admin/AdminProductsList'
import AppPagination from '@/components/ui/AppPagination'
import AppLoader from '@/components/ui/AppLoader'
import AppFilterForm from '@/components/AppFilterForm'

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
		AdminProductsList,
		AppPagination,
		AppLoader,
		AppFilterForm,
	},
}
</script>
