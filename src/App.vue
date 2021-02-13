<template>
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const layout = computed(() => route.meta.layout)

		return {
			layout,
		}
	},
	components: {
		MainLayout,
		AuthLayout,
		AdminLayout,
	},
}
</script>

<style>
.page {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	min-height: 20rem;
}
<<<<<<< HEAD
=======

>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
.product-loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
<<<<<<< HEAD
=======

>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
.img-table-preview {
	width: 24px;
	height: 24px;
}
</style>
