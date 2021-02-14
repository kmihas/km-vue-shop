<template>
	<nav class="row">
		<div class="nav-wrapper blue-grey darken-3">
			<ul id="nav-mobile" class="left">
				<li>
					<router-link to="/">
						<i class="material-icons">arrow_back</i>
					</router-link>
				</li>
			</ul>
			<router-link to="/admin" class="brand-logo"
				>Панель администратора</router-link
			>
			<ul id="nav-mobile" class="right">
				<li :class="{ active: route.path === '/admin/products' }">
					<router-link to="/admin/products">Товары</router-link>
				</li>
				<li :class="{ active: route.path === '/admin/categories' }">
					<router-link to="/admin/categories">Категории</router-link>
				</li>
				<li><a href="" @click.prevent="logout">Выход</a></li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'Navbar',
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const logout = () => {
			store.commit('auth/logout')
			router.push('/auth')
		}

		return {
			logout,
			route,
		}
	},
}
</script>

<style scoped>
.brand-logo {
	margin-left: 2rem;
}
</style>
