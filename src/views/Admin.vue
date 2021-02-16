<template>
	<div class="container">
		<router-view />
	</div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
	setup() {
		const store = useStore()
		const load = async () => {
			await store.dispatch('categories/getCategories')
			await store.dispatch('products/getProducts')
		}

		onMounted(() => {
			load()
		})

		return {}
	},
}
</script>
