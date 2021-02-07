import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useFilterForm(props, context) {
  const route = useRoute()
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

  const onSearch = () => {
    context.emit('search', searchString.value)
  }

  const changeCategory = (cat) => {
    context.emit('changecat', cat)
  }

  const clearFilter = () => {
    searchString.value = ''
    changeCategory('all')
    M.updateTextFields()
  }

  onMounted(() => {
    searchString.value = route.query.q
    M.updateTextFields()
  })

  watch(searchString, (newVal) => {
    onSearch()
    M.updateTextFields()
  })

  return {
    catProducts,
    searchString,
    onSearch,
    changeCategory,
    clearFilter
  }
}