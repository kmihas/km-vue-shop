import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const cart = computed(() => store.getters['cart/cart'])
  const cartProducts = computed(() => store.getters['cart/cartProducts'])
  const cartClear = computed(() => store.getters['cart/cartCount'])
  const loading = computed(() => store.getters['cart/loading'])

  onMounted(() => {
    store.dispatch('cart/getCartProducts')
  })

  return {
    cart,
    cartProducts,
    cartClear,
    loading
  }
}