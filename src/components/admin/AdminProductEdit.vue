<template>
	<AppModalWrapper @close="$emit('close')">
		<div class="container card-content">
			<form class="white-text" @submit.prevent="onSubmit">
				<div class="input-field">
					<label for="title">Название</label>
					<input
						:class="['validate', { valid: editedProduct.title !== '' }]"
						type="text"
						id="title"
						v-model.trim="editedProduct.title"
					/>
				</div>

				<div class="input-field col s12">
					<select v-model.trim="editedProduct.category">
						<option
							v-for="item in categories"
							:key="item.id"
							:value="item.type"
							:selected="item.type === editedProduct.category"
						>
							{{ item.title }}
						</option>
					</select>
					<label>Категория</label>
				</div>

				<div class="input-field">
					<label for="price">Цена</label>
					<input
						:class="['validate', { valid: editedProduct.price !== '' }]"
						type="text"
						id="price"
						v-model.trim="editedProduct.price"
					/>
				</div>

				<div class="input-field">
					<label for="count">Количество</label>
					<input
						:class="['validate', { valid: editedProduct.count !== '' }]"
						type="text"
						id="count"
						v-model.trim="editedProduct.count"
					/>
				</div>

				<div class="input-field">
					<label for="picture">Изображение (ссылка)</label>
					<input
						:class="['validate', { valid: editedProduct.img !== '' }]"
						type="text"
						id="picture"
						v-model.trim="editedProduct.img"
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
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import AppModalWrapper from '../AppModalWrapper'

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
	setup({ product }, context) {
		const store = useStore()
		const { id, title, count, category, price, img } = product
		const editedProduct = reactive({
			id,
			title,
			count,
			category,
			price,
			img,
		})

		const primeState = {
			id,
			title,
			count,
			category,
			price,
			img,
		}

		const change = computed(() => {
			return Object.keys(primeState).reduce((acc, item) => {
				const el = primeState[item] !== editedProduct[item] ? true : false
				return acc || el
			}, false)
		})

		const save = async () => {
			if (editedProduct.id) {
				await store.dispatch('products/saveProductById', editedProduct)
			} else {
				const body = editedProduct
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

		return {
			editedProduct,
			save,
			change,
		}
	},
	components: {
		AppModalWrapper,
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 50rem;
}
</style>
