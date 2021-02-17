<template>
	<div class="auth__layout">
		<div class="container card card-login">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	setup() {
		return {}
	},
}
</script>

<style>
.auth__layout {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.card-login {
	width: 400px;
	margin: 0 auto;
}
</style>
