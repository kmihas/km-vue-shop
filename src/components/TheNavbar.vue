<template>
	<nav class="row">
		<div class="nav-wrapper blue-grey darken-3">
			<router-link to="/" class="brand-logo">Продукты</router-link>
			<ul id="nav-mobile" class="right">
				<li class="user__mail" v-if="isAuth">
					{{ userEmail }}
				</li>
				<li :class="{ active: path === '/shop' || path === '/' }">
					<router-link to="/shop">Магазин</router-link>
				</li>
				<li :class="{ active: path === '/cart' }">
					<router-link to="/cart">
						Корзина
						<span
							class="new badge red"
							data-badge-caption=""
							v-if="cartCount"
							>{{ cartCount }}</span
						>
					</router-link>
				</li>
				<li v-if="isAdmin">
					<router-link to="/admin">Админка</router-link>
				</li>
				<li v-if="isAuth">
					<a href="" @click.prevent="logout">Выход</a>
				</li>
				<li v-else>
					<router-link to="/auth">Войти</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	name: 'Navbar',
	setup() {
		const store = useStore()
		const route = useRoute()
		const userEmail = computed(() => store.getters['auth/userEmail'])
		const isAdmin = computed(() => {
			return store.getters['auth/isAdmin']
		})
		const isAuth = computed(() => {
			return store.getters['auth/isAutenticated']
		})
		const path = computed(() => route.path)

		const logout = () => {
			store.commit('auth/logout')
		}

		const cartCount = computed(() => store.getters['cart/cartCount'])

		return {
			cartCount,
			isAuth,
			isAdmin,
			logout,
			path,
			userEmail,
		}
	},
}
</script>

<style scoped>
.brand-logo {
	margin-left: 2rem;
}

.user__mail {
	padding: 0 2rem;
}
</style>
