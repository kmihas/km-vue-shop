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
				<th></th>
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
						@click.prevent="showModal('AdminProductEdit', item.id)"
						>edit</i
					>
				</td>
				<td>
					<i
						class="material-icons"
						@click.prevent="showModal('AdminProductDelete', item.id)"
						>delete</i
					>
				</td>
			</tr>
		</tbody>
	</table>
	<AppModalWrapper v-if="isModal">
		<component :is="modalComponent" :id="itemId" />
	</AppModalWrapper>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppModalWrapper from '../AppModalWraper'
import AdminProductEdit from './AdminProductEdit'
import AdminProductDelete from './AdminProductDelete'

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
		const itemId = ref('')
		const modalComponent = ref('')
		const showModal = (component, num) => {
			modalComponent.value = component
			itemId.value = num
			store.commit('setModal', true)
		}
		const getCategory = (string) => {
			const idx = props.categories.findIndex((el) => el.type === string)
			return props.categories[idx].title
		}
		return {
			isModal,
			getCategory,
			showModal,
			itemId,
			modalComponent,
		}
	},
	components: {
		AppModalWrapper,
		AdminProductEdit,
		AdminProductDelete,
	},
}
</script>

<style scoped>
.material-icons {
	cursor: pointer;
}
</style>
