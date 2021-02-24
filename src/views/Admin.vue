<template>
	<router-view />
</template>

<script>
import { useLoadEnter } from '@/use/load-enter'

export default {
	setup() {
		return {
			...useLoadEnter(),
		}
	},
}
</script>
