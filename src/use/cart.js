import { computed, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const cart = computed(() => store.getters['cart/cart'])
  const cartProducts = computed(() => store.getters['cart/cartProducts'])
  const cartClear = computed(() => {
    return !Object.keys(cart.value).length
  })
  const loading = computed(() => store.getters['cart/loading'])

  const countUp = (id) => {
    store.commit('cart/upProductCount', id)
  }

  const countDown = (id) => {
    store.commit('cart/downProductCount', id)
  }

  const cartLength = computed(() => Object.keys(cart.value).length)

  onBeforeMount(() => {
    store.dispatch('cart/getCartProducts')
  })

  watch(cartLength, (newVal, oldVal) => {
    if( newVal > oldVal ){
      store.dispatch('cart/getCartProducts')
    }
  })

  return {
    cart,
    cartProducts,
    cartClear,
    countUp,
    countDown,
    loading
  }
}