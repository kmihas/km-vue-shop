<template>
	<div class="container col s9 m9 x9">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Название</th>
					<th>Категория</th>
					<th>Изображение</th>
					<th>Кол-во</th>
					<th>Цена</th>
					<th>
						<i class="material-icons" @click.prevent="toEdit({})">
							add
						</i>
					</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="item in products" :key="item.id">
					<td></td>
					<td>{{ item.title }}</td>
					<td>{{ getCategory(item.category) }}</td>
					<td>
						<img :src="item.img" class="img-table-preview" />
					</td>
					<td>{{ item.count }}</td>
					<td>{{ item.price }}</td>
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
	</div>
	<AdminProductEdit
		:product="product"
		:categories="categories"
		v-if="isEdit"
		@close="isEdit = false"
	/>
	<AppConfirm
		:title="confirmTitle"
		v-if="confirm"
		@reject="confirm = false"
		@confirm="deleteProduct(confirmItem.id)"
	/>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AdminProductEdit from './AdminProductEdit'
import AppConfirm from '../ui/AppConfirm'

export default {
	name: 'AdminProductsTable',
	props: {
		products: {
			type: Array,
			requared: true,
			default: [],
		},
		categories: {
			type: Array,
			requared: true,
		},
	},
	setup(props) {
		const store = useStore()
		const confirm = ref(false)
		const confirmTitle = ref('')
		const confirmItem = ref({})
		const isEdit = ref(false)
		const product = ref('')

		const toEdit = (item) => {
			product.value = item
			isEdit.value = true
		}

		const getCategory = (string) => {
			const idx = props.categories.findIndex((el) => el.type === string)
			return props.categories[idx].title
		}

		const deleteProduct = (id) => {
			store.dispatch('products/deleteProduct', id)
			store.dispatch('products/getProducts')
			confirm.value = false
		}

		const confirmDelete = (item) => {
			confirmTitle.value = `Вы уверены, что хотите удалить товар "${item.title}" ?`
			confirmItem.value = item
			confirm.value = true
		}

		return {
			confirm,
			confirmTitle,
			confirmItem,
			isEdit,
			toEdit,
			getCategory,
			product,
			deleteProduct,
			confirmDelete,
		}
	},
	components: {
		AdminProductEdit,
		AppConfirm,
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
}
</style>
