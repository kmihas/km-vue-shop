<template>
	<button
		class="btn-small blue-grey darken-2"
		@click.prevent="countDown(productId)"
	>
		-
	</button>
	<span class="prodcount">{{ count }}</span>
	<button
		class="btn-small blue-grey darken-2"
		@click.prevent="countUp(productId)"
	>
		+
	</button>
</template>

<script>
import { useStore } from 'vuex'

export default {
	name: 'Amount',
	props: {
		productId: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
	},
	setup() {
		const store = useStore()
		const countUp = (id) => {
			store.commit('cart/upProductCount', id)
		}

		const countDown = (id) => {
			store.commit('cart/downProductCount', id)
		}
		return {
			countUp,
			countDown,
		}
	},
}
</script>

<style lang="scss" scoped>
.prodcount {
	padding: 0.5rem;
	font-weight: 700;
}
</style>
