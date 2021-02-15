<template>
	<div>удаляем товар: {{ product.id }}</div>
</template>

<script>
export default {
	name: 'AdminProductDelete',
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	setup() {
		return {}
	},
}
</script>

<style lang="scss" scoped></style>
