<template>
	<teleport to="body">
		<div class="backplate"></div>
		<div class="modal">
			Модальное окно компонентом
		</div>
	</teleport>
</template>

<script>
export default {
	setup() {
		return {}
	},
}
</script>

<style lang="scss" scoped>
.backplate {
	background: black;
	opacity: 0.2;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
}

.modal {
	z-index: 101;
}
</style>
