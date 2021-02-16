<template>
	<AppModalWrapper @close="$emit('close')">
		<div class="container card-content">
			<form class="white-text" @submit.prevent="onSubmit">
				<div class="input-field">
					<label for="title">Название</label>
					<input
						:class="['validate', { valid: editedCategory.title !== '' }]"
						type="text"
						id="title"
						v-model.trim="editedCategory.title"
					/>
				</div>

				<div class="input-field">
					<label for="type">Тип</label>
					<input
						:class="['validate', { valid: editedCategory.type !== '' }]"
						type="text"
						id="type"
						v-model.trim="editedCategory.type"
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
	name: 'AdminCategoryEdit',
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
	emits: ['close'],
	setup({ category }, context) {
		const store = useStore()
		const { id, title, type } = category
		const editedCategory = reactive({
			id,
			title,
			type,
		})

		const primeState = {
			id,
			title,
			type,
		}

		const change = computed(() => {
			return Object.keys(primeState).reduce((acc, item) => {
				const el = primeState[item] !== editedCategory[item] ? true : false
				return acc || el
			}, false)
		})

		const save = async () => {
			if (editedCategory.id) {
				await store.dispatch('categories/saveCategoryById', editedCategory)
			} else {
				const body = editedCategory
				delete body.id
				await store.dispatch('categories/saveCategory', body)
			}
			store.dispatch('categories/getCategories')
			context.emit('close')
		}

		onMounted(() => {
			M.updateTextFields()
		})

		return {
			editedCategory,
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
