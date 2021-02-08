import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useFilterForm(props, context) {
  const route = useRoute()
  const router = useRouter()
  const searchString = ref('')
  const catProducts = computed(() => {
    return [
      {
        type: 'all',
        title: 'Все',
        id: '0',
      },
      ...props.categoryes,
    ]
  })

  const changeSearch = () => {
    context.emit('search', searchString.value)
  }

  const changeCategory = (cat) => {
    context.emit('changecat', cat)
  }

  const clearFilter = async () => {
    await router.push(route.path)
    await changeCategory('all')
    searchString.value = ''
    M.updateTextFields()
  }

  onMounted(() => {
    if(route.query.q) {
      searchString.value = route.query.q
    }
    M.updateTextFields()
  })

  watch(searchString, (newVal) => {
    changeSearch()
    M.updateTextFields()
  })

  return {
    catProducts,
    searchString,
    changeSearch,
    changeCategory,
    clearFilter
  }
}