<template>
	<div class="card">
		This is Product page
		<button @click.prevent="getData">получить</button>
		<router-view />
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	setup() {
		const store = useStore()
		const prod = computed(() => store.products)

		console.log(prod)

		const getData = () => store.dispatch('products/getAllProducts')

		return {
			getData,
		}
	},
}
</script>
