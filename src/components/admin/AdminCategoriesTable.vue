<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Тип(<small>на английском</small>)</th>
				<th>Название</th>
				<th>
					<i
						class="material-icons"
						@click.prevent="showModal('AdminCategoryEdit', {})"
					>
						add
					</i>
				</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="item in categories" :key="item.id">
				<td></td>
				<td>{{ item.type }}</td>
				<td>{{ item.title }}</td>
				<td>
					<i
						class="material-icons"
						@click.prevent="showModal('AdminCategoryEdit', item)"
					>
						edit
					</i>
				</td>
				<td>
					<i class="material-icons" @click.prevent="deleteCategory(item.id)">
						delete
					</i>
				</td>
			</tr>
		</tbody>
	</table>
	<AppModalWrapper v-if="isModal">
		<component :is="modalComponent" :category="category" />
	</AppModalWrapper>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppModalWrapper from '../AppModalWrapper'
import AdminCategoryEdit from './AdminCategoryEdit'

export default {
	name: 'AdminCategoriesTable',
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
	setup() {
		const store = useStore()
		const isModal = computed(() => store.getters['showModal'])
		const category = ref('')
		const modalComponent = ref('')
		const showModal = (component, item) => {
			modalComponent.value = component
			category.value = item
			store.commit('setModal', true)
		}

		const deleteCategory = async (id) => {
			await store.dispatch('categories/deleteCategory', id)
			await store.dispatch('categories/getCategories')
			store.commit('setModal', false)
		}

		return {
			isModal,
			category,
			modalComponent,
			showModal,
			deleteCategory,
		}
	},
	components: {
		AppModalWrapper,
		AdminCategoryEdit,
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
}
</style>
