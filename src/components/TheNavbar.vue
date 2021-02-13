<template>
	<nav class="row">
		<div class="nav-wrapper blue-grey darken-3">
			<router-link to="/" class="brand-logo">Продукты</router-link>
			<ul id="nav-mobile" class="right">
				<li :class="{ active: route.path === '/shop' || route.path === '/' }">
					<router-link to="/shop">Магазин</router-link>
				</li>
				<li :class="{ active: route.path === '/cart' }">
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
				<li><a href="" @click.prevent="logout">Выход</a></li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

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

		console.log('path', route.path)

		const cartCount = computed(() => store.getters['cart/cartCount'])

		return {
			cartCount,
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
