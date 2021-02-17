<template>
	<AppModalWrapper @close="close">
		<div class="center-align">
			<h5>Редактирование категории</h5>
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

				<div class="input-field">
					<label for="type">Тип</label>
					<input
						:class="['validate', { valid: editedItem.type !== '' }]"
						type="text"
						id="type"
						v-model.trim="editedItem.type"
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
		const confirm = ref(false)
		const { id, title, type } = category
		const editedItem = reactive({ id, title, type })
		const primeItem = { id, title, type }

		const change = computed(() => {
			return Object.keys(primeItem).reduce((acc, item) => {
				const el = primeItem[item] !== editedItem[item] ? true : false
				return acc || el
			}, false)
		})

		const save = async () => {
			if (editedItem.id) {
				await store.dispatch('categories/saveCategoryById', editedItem)
			} else {
				const body = editedItem
				delete body.id
				await store.dispatch('categories/saveCategory', body)
			}
			store.dispatch('categories/getCategories')
			context.emit('close')
		}

		const close = () => {
			change.value ? (confirm.value = true) : context.emit('close')
		}

		onMounted(() => {
			M.updateTextFields()
		})

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
