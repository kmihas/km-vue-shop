<template>
	<TheNavbarAdmin />
	<div class="container">
		<router-view />
	</div>
	<TheFooter />
</template>

<script>
import TheNavbarAdmin from '../components/TheNavbarAdmin'
import TheFooter from '../components/TheFooter'

export default {
	setup() {
		return {}
	},
	components: {
		TheNavbarAdmin,
		TheFooter,
	},
}
</script>

<style scoped>
.container {
	width: 100%;
	min-height: 40rem;
}
</style>
