<template>
	<TheNavbar />
	<div class="container with-nav">
		<router-view />
	</div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'

export default {
	setup() {
		return {}
	},
	components: {
		TheNavbar,
	},
}
</script>
