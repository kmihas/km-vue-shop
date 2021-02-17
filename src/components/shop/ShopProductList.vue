<template>
	<div class="container col s9 m9 x9">
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
			<AppPagination :curr="+pageCurr" :last="+pageLast" v-if="show" />
		</div>
	</div>
</template>

<script>
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
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
	setup(props) {
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

		const show = computed(() => props.products.length)

		watch(pageCurr, (newVal) => {
			store.commit('products/setPage', newVal)
		})

		onMounted(() => {
			store.commit('products/setPage', pageCurr)
		})

		return {
			pageCurr,
			pageLast,
			show,
		}
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
	flex-wrap: wrap;
	min-height: 20rem;
}

.product-loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
