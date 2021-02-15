<template>
	<div class="delete__box">
		<div class="center-align">
			<h5>Удаление товара "{{ product.title }}"</h5>
			<button
				class="btn blue-grey darken-2 right-align waves-effect"
				@click.prevent="deleteProduct(product.id)"
			>
				удалить
			</button>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'

export default {
	name: 'AdminProductDelete',
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const store = useStore()
		const deleteProduct = (id) => {
			store.dispatch('products/deleteProduct', id)
			store.dispatch('products/getProducts')
			store.commit('setModal', false)
		}

		return {
			deleteProduct,
		}
	},
}
</script>

<style lang="scss" scoped>
.delete__box {
	position: absolute;
	top: 3rem;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
}
</style>
