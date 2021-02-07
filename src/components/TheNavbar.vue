<template>
	<nav class="row">
		<div class="nav-wrapper blue-grey darken-3">
			<router-link to="/" class="brand-logo">Vue-Shop</router-link>
			<ul id="nav-mobile" class="right">
				<li><router-link to="/shop">Home</router-link></li>
				<li>
					<router-link to="/cart">
						Cart
						<span
							class="new badge red"
							data-badge-caption=""
							v-if="cartCount"
							>{{ cartCount }}</span
						>
					</router-link>
				</li>
				<li><a href="" @click.prevent="logout">Logout</a></li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	name: 'Navbar',
	setup() {
		const store = useStore()
		const router = useRouter()
		const logout = () => {
			store.commit('auth/logout')
			router.push('/auth')
		}

		const cartCount = computed(() => store.getters['cart/cartCount'])

		return {
			cartCount,
			logout,
		}
	},
}
</script>
