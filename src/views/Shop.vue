<template>
	<div class="row col s12">
		<shop-filter
			:categoryes="categoryes"
			:category="category"
			@search="search"
			@changecat="changeCategory"
		/>
		<shop-page />
	</div>
</template>

<script>
import ShopFilter from '../components/shop/ShopFilter'
import ShopPage from '../components/shop/ShopPage'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
	name: 'Shop',
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const categoryes = computed(() => store.getters['categoryes/categoryes'])
		const category = ref('')

		const search = (string) => {
			const url = `${route.path}?q=${string}&category=${category.value}`
			router.push(url)
		}

		const changeCategory = (cat) => {
			category.value = cat
			const url = `${route.path}?q=${route.query.q}&category=${category.value}`
			router.push(url)
		}

		onMounted(() => {
			store.dispatch('categoryes/getCategoryes')
			if (route.query.category) {
				category.value = route.query.category
			} else {
				category.value = 'all'
			}
		})

		return {
			search,
			category,
			categoryes,
			changeCategory,
		}
	},
	components: {
		ShopPage,
		ShopFilter,
	},
}
</script>
