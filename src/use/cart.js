import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const cart = computed(() => store.getters['cart/cart'])
  const cartProducts = computed(() => store.getters['cart/cartProducts'])
  const cartLength = computed(() => Object.keys(cart.value).length)
  const cartClear = computed(() => !cartLength.value)
  const loading = computed(() => store.getters['cart/loading'])

  watch(cartLength, (newVal, oldVal) => {
    if( newVal > oldVal ){
      store.dispatch('cart/getCartProducts')
    }
  })

  return {
    cart,
    cartProducts,
    cartClear,
    loading
  }
}