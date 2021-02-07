<template>
	<TheNavbar />
	<div class="row">
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
