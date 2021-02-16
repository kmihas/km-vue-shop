<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Тип(<small>на английском</small>)</th>
				<th>Название</th>
				<th>
					<i class="material-icons" @click.prevent="toEdit({})">
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
					<i class="material-icons" @click.prevent="toEdit(item)">
						edit
					</i>
				</td>
				<td>
					<i class="material-icons" @click.prevent="confirmDelete(item)">
						delete
					</i>
				</td>
			</tr>
		</tbody>
	</table>
	<AdminCategoryEdit
		:category="category"
		v-if="isEdit"
		@close="isEdit = false"
	/>
	<AppConfirm
		:title="confirmTitle"
		v-if="confirm"
		@reject="confirm = false"
		@confirm="deleteCategory(confirmItem.id)"
	/>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AdminCategoryEdit from './AdminCategoryEdit'
import AppConfirm from '../ui/AppConfirm'

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
		const confirm = ref(false)
		const confirmTitle = ref('')
		const confirmItem = ref({})
		const isEdit = ref(false)
		const category = ref('')

		const toEdit = (item) => {
			category.value = item
			isEdit.value = true
		}

		const deleteCategory = async (id) => {
			await store.dispatch('categories/deleteCategory', id)
			await store.dispatch('categories/getCategories')
			confirm.value = false
		}

		const confirmDelete = (item) => {
			confirmTitle.value = `Вы уверены, что хотите удалить категорию "${item.title}" ?`
			confirmItem.value = item
			confirm.value = true
		}

		return {
			category,
			toEdit,
			isEdit,
			deleteCategory,
			confirm,
			confirmTitle,
			confirmItem,
			confirmDelete,
		}
	},
	components: {
		AdminCategoryEdit,
		AppConfirm,
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
}
</style>
