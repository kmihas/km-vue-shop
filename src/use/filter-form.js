import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useFilterForm(context) {
  const route = useRoute()
  const searchString = ref(route.query.search || '')
  const category = ref(route.query.category || '')

  const changeSearch = () => {
    context.emit('search', searchString.value)
  }

  const changeCategory = (cat) => {
    context.emit('changecat', cat)
  }

  const clearFilter = async () => {
    searchString.value = ''
    await context.emit('changecat', '')
    M.updateTextFields()
  }

  onMounted(() => {
    M.updateTextFields()
  })

  watch(searchString, (newVal) => {
    changeSearch()
    M.updateTextFields()
  })

  return {
    searchString,
    category,
    changeSearch,
    changeCategory,
    clearFilter
  }
}