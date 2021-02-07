<template>
	<TheNavbar />
	<div class="container">
		<router-view />
	</div>
	<TheFooter />
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import TheFooter from '../components/TheFooter'

export default {
	setup() {
		return {}
	},
	components: {
		TheNavbar,
		TheFooter,
	},
}
</script>

<style scoped>
.container {
	min-height: 45rem;
}
</style>
