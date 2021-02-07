<template>
	<span class="card-title">
		<h4 class="text-center" v-if="cartClear">В корзине пока ничего нет</h4>
		<h4 class="text-center" v-else>Корзина</h4>
	</span>
</template>

<script>
export default {
	name: 'CartTitle',
	props: {
		cartClear: {
			type: Boolean,
			requared: true,
		},
	},
	setup() {},
}
</script>
