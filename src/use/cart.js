import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()
  const router = useRouter()
  const cart = computed(() => store.getters['cart/cart'])
  const cartProducts = computed(() => store.getters['cart/cartProducts'])
  const cartClear = computed(() => store.getters['cart/cartCount'])
  const loading = computed(() => store.getters['cart/loading'])
  const isAuth = computed(() => {
    return store.getters['auth/isAutenticated']
  })
  const authModal = ref(false)
  const tabs = ref(true)
  const userId = computed(() => store.getters['auth/userId'])

  const regTab = () => {
    tabs.value = false
    authModal.value = true
  }

  const loginTab = () => {
    tabs.value = true
    authModal.value = true
  }

  const onPay = () => {
    const order = {
      date: Date.now(),
      userId: userId.value,
      list: []
    }
    cartProducts.value.forEach(el => {
      el.count = cart.value[el.id]
      order.list.push({
        productId: el.id,
        count: cart.value[el.id],
        price: el.price
      })
    })
    store.dispatch('orders/saveOrder', order)
    router.push('/')
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