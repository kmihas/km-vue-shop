<template>
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

export default {
	setup() {
		const route = useRoute()
		const layout = computed(() => route.meta.layout)

		return {
			layout,
		}
	},
	components: {
		MainLayout,
		AuthLayout,
	},
}
</script>

<style lang="scss" scoped></style>
