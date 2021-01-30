<template>
	<TheNavbar />
	<div class="container with-nav">
		<div class="card">
			<router-view />
		</div>
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
