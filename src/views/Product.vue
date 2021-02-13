<template>
	<div class="container">
		<div class="" v-if="id">
			<a class="btn-floating blue-grey darken-3" @click.prevent="onBack">
				<i class="material-icons">arrow_back</i>
			</a>
			<AppLoader v-if="isLoading" />
			<div class="col s12 m6" v-else>
				<div class="card horizontal">
					<div class="card-image">
						<img :src="product.img" />
					</div>
					<div class="card-stacked center-align">
						<div class="card-content">
							<span class="card-title">{{ product.title }}</span>
						</div>
						<div>
							<p>Цена: {{ product.price }} руб.</p>
							<p>Кол-во: {{ product.count }}</p>
						</div>
						<div class="card-action center-align">
							<AppAddCart
								:id="id"
								:count="+product.count"
								:cartCount="+cartCount"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<h3 class="center-align" v-else>
			Товар не найден.
		</h3>
	</div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppAddCart from '../components/ui/AppAddCart'
import AppLoader from '../components/ui/AppLoader'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const id = computed(() => route.params.id)
		const product = computed(() => store.getters['products/product'])
		const isLoading = computed(() => store.getters['product/loading'])
		const cart = computed(() => store.getters['cart/cart'])
		const cartCount = computed(() => {
			return cart.value[id.value] ? cart.value[id.value] : 0
		})

		const onBack = () => {
			router.back()
		}

		onBeforeMount(() => {
			store.dispatch('products/getProductById', id.value)
		})

		return {
			id,
			cartCount,
			onBack,
			product,
			isLoading,
		}
	},
	components: {
		AppAddCart,
		AppLoader,
	},
}
</script>
