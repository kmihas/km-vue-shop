<template>
	<div>удаляем товар - {{ id }}</div>
</template>

<script>
export default {
	name: 'AdminProductDelete',
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
