<template>
	<div class="container">
		<div class="" v-if="id">
			<a class="btn-floating blue-grey darken-3" @click.prevent="onBack">
				<i class="material-icons">arrow_back</i>
			</a>
		</div>
		<div v-if="isLoading">
			<AppLoader />
		</div>
		<div v-else class="col s12 m6">
			<div class="card horizontal" v-if="product">
				<div class="card-image">
					<img :src="product.img" />
				</div>
				<div class="card-stacked">
					<div class="card-content">
						<div class="card-title">
							{{ product.title }}
						</div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
							dignissimos ipsam nemo, omnis quidem odit velit necessitatibus,
							tempore, laboriosam eius animi eligendi delectus excepturi facere
							harum eum sit consequuntur tempora neque laudantium consectetur
							deleniti modi praesentium repellat.
						</p>
						<p>В наличии: {{ product.count }}</p>
						<p>Цена: {{ product.price }} руб.</p>
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
			<h3 class="center-align" v-else>
				Товар не найден.
			</h3>
		</div>
	</div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppAddCart from '@/components/ui/AppAddCart'
import AppLoader from '@/components/ui/AppLoader'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const id = route.params.id
		const product = computed(() => store.getters['products/product'])
		const isLoading = computed(() => store.getters['products/loading'])
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
