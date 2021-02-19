import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const cart = computed(() => store.getters['cart/cart'])
  const cartProducts = computed(() => store.getters['cart/cartProducts'])
  const cartClear = computed(() => store.getters['cart/cartCount'])
  const loading = computed(() => store.getters['cart/loading'])
  const isAuth = computed(() => {
    return store.getters['auth/isAutenticated']
  })
  const authModal = ref(false)
  const tabs = ref(true)

  const regTab = () => {
    tabs.value = false
    authModal.value = true
  }

  const loginTab = () => {
    tabs.value = true
    authModal.value = true
  }

  const onPay = () => {
    console.log('pay', cartProducts.value)

  }

  watch((isAuth), (newVal, oldVal) => {
    if( newVal && !oldVal ) {
      authModal.value = false
    }
  })

  onMounted(() => {
    store.dispatch('cart/getCartProducts')
  })

  return {
    cart,
    cartProducts,
    cartClear,
    loading,
    isAuth,
    authModal,
    tabs,
    loginTab,
    regTab,
    onPay
  }
}