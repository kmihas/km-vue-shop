import { computed, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const cart = computed(() => store.getters['products/cart'])
  const cartProducts = computed(() => store.getters['products/cartProducts'])
  const cartClear = computed(() => {
    return !Object.keys(cart.value).length
  })
  const loading = computed(() => store.getters['products/loading'])

  const countUp = (id) => {
    store.commit('products/upProductCount', id)
  }

  const countDown = (id) => {
    store.commit('products/downProductCount', id)
  }

  const cartLength = computed(() => Object.keys(cart.value).length)

  onBeforeMount(() => {
    store.dispatch('products/getCartProducts')
  })

  watch(cartLength, (newVal, oldVal) => {
    if( newVal > oldVal ){
      store.dispatch('products/getCartProducts')
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