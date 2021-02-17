<template>
	<AppModalWrapper @close="close">
		<div class="center-align">
			<h5>Редактирование товара</h5>
		</div>
		<div class="container card-content">
			<form class="white-text" @submit.prevent="onSubmit">
				<div class="input-field">
					<label for="title">Название</label>
					<input
						:class="['validate', { valid: editedItem.title !== '' }]"
						type="text"
						id="title"
						v-model.trim="editedItem.title"
					/>
				</div>

				<div class="input-field col s12">
					<select v-model.trim="editedItem.category">
						<option
							v-for="item in categories"
							:key="item.id"
							:value="item.type"
							:selected="item.type === editedItem.category"
						>
							{{ item.title }}
						</option>
					</select>
					<label>Категория</label>
				</div>

				<div class="input-field">
					<label for="price">Цена</label>
					<input
						:class="['validate', { valid: editedItem.price !== '' }]"
						type="text"
						id="price"
						v-model.trim="editedItem.price"
					/>
				</div>

				<div class="input-field">
					<label for="count">Количество</label>
					<input
						:class="['validate', { valid: editedItem.count !== '' }]"
						type="text"
						id="count"
						v-model.trim="editedItem.count"
					/>
				</div>

				<div class="input-field">
					<label for="picture">Изображение (ссылка)</label>
					<input
						:class="['validate', { valid: editedItem.img !== '' }]"
						type="text"
						id="picture"
						v-model.trim="editedItem.img"
					/>
				</div>

				<div class="right-align">
					<button
						class="btn blue-grey darken-2 right-align waves-effect"
						type="submit"
						:disabled="!change"
						@click.prevent="save"
					>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	</AppModalWrapper>
	<AppConfirm
		title="Вы внесли изменения, но не сохранили. Закрыть?"
		v-if="confirm"
		@reject="confirm = false"
		@confirm="$emit('close')"
	/>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import AppModalWrapper from '../AppModalWrapper'
import AppConfirm from '../ui/AppConfirm'

export default {
	name: 'AdminProductEdit',
	props: {
		product: {
			type: Object,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
	},
	emits: ['close'],
	setup({ product }, context) {
		const store = useStore()
		const confirm = ref(false)
		const { id, title, count, category, price, img } = product
		const editedItem = reactive({ id, title, count, category, price, img })
		const primeItem = { id, title, count, category, price, img }

		const change = computed(() => {
			return Object.keys(primeItem).reduce((acc, item) => {
				const el = primeItem[item] !== editedItem[item] ? true : false
				return acc || el
			}, false)
		})

		const save = async () => {
			if (editedItem.id) {
				await store.dispatch('products/saveProductById', editedItem)
			} else {
				const body = editedItem
				delete body.id
				await store.dispatch('products/saveProduct', body)
			}
			store.dispatch('products/getProducts')
			context.emit('close')
		}

		onMounted(() => {
			M.FormSelect.init(document.querySelectorAll('select'))
			M.updateTextFields()
		})

		const close = () => {
			change.value ? (confirm.value = true) : context.emit('close')
		}

		return {
			editedItem,
			save,
			change,
			confirm,
			close,
		}
	},
	components: {
		AppModalWrapper,
		AppConfirm,
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 50rem;
}
</style>
