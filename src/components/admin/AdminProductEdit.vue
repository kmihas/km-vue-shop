<template>
	<div>редактируем товар - {{ id }}</div>
</template>

<script>
export default {
	name: 'AdminProductEdit',
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {}
	},
}
</script>

<style lang="scss" scoped></style>
