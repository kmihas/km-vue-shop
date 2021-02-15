<template>
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
					<i
						class="material-icons"
						@click.prevent="showModal('AdminProductEdit', {})"
					>
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
					<i
						class="material-icons"
						@click.prevent="showModal('AdminProductEdit', item)"
					>
						edit
					</i>
				</td>
				<td>
					<i class="material-icons" @click.prevent="deleteProduct(item.id)">
						delete
					</i>
				</td>
			</tr>
		</tbody>
	</table>
	<AppModalWrapper v-if="isModal">
		<component
			:is="modalComponent"
			:product="product"
			:categories="categories"
		/>
	</AppModalWrapper>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppModalWrapper from '../AppModalWrapper'
import AdminProductEdit from './AdminProductEdit'

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
		const isModal = computed(() => store.getters['showModal'])
		const product = ref('')
		const modalComponent = ref('')
		const showModal = (component, item) => {
			modalComponent.value = component
			product.value = item
			store.commit('setModal', true)
		}
		const getCategory = (string) => {
			const idx = props.categories.findIndex((el) => el.type === string)
			return props.categories[idx].title
		}

		const deleteProduct = (id) => {
			store.dispatch('products/deleteProduct', id)
			store.dispatch('products/getProducts')
			store.commit('setModal', false)
		}

		return {
			isModal,
			getCategory,
			showModal,
			product,
			modalComponent,
			deleteProduct,
		}
	},
	components: {
		AppModalWrapper,
		AdminProductEdit,
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
}
</style>
