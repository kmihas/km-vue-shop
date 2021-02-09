<template>
	<div class="row">
		<div class="col s12">
			<div class="card small">
				<router-link :to="{ path: `/product/${product.id}` }">
					<div class="card-image">
						<img :src="product.img" />
					</div>
				</router-link>
				<div class="card-title">
					<span class="">{{ product.title }}</span>
				</div>
				<div class="card-action">
					<AppAddCart :product="product" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AppAddCart from '../ui/AppAddCart'

export default {
	props: {
		product: {
			type: Object,
			requared: true,
		},
	},
	setup() {
		return {}
	},
	components: {
		AppAddCart,
	},
}
</script>

<style lang="scss" scoped>
.row {
	width: 200px;
	margin: 0.1rem;
	text-align: center;
}

.prodcount {
	padding: 1rem;
}
</style>
