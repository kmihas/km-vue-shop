<template>
	<div class="col s2 m2 x2">
		<div class="input-field">
			<input type="text" id="search" v-model="search" @change="changeSearch" />
			<label for="search">Найти товар...</label>
		</div>
		<div>
			<ul class="collection">
				<li :class="['collection-item', { active: category === '' }]">
					<a href="#" @click="changeCategory('')">
						Все
					</a>
				</li>
				<li
					:class="[
						'collection-item',
						{ active: item.type === modelValue.category },
					]"
					v-for="item in categories"
					:key="item.id"
				>
					<a href="#" @click="changeCategory(item.type)">
						{{ item.title }}
					</a>
				</li>
			</ul>
		</div>
		<button
			class="btn-small blue-grey darken-2 waves-effect"
			@click="clearFilter"
		>
			Очистить
		</button>
	</div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
	name: 'ShopFilter',
	props: {
		categories: {
			type: Object,
			requared: true,
		},
		modelValue: {
			type: Object,
		},
	},
<<<<<<< HEAD
	emits: ['update:modelValue'],
	setup({ modelValue }, context) {
		const router = useRouter()
		const search = ref(modelValue.search)
		const category = ref(modelValue.category)

		const changeSearch = (event) => {
			search.value = event.target.value
		}

		const changeCategory = (cat) => {
			category.value = cat
		}

		const clearFilter = async () => {
			search.value = ''
			changeCategory('')
			M.updateTextFields()
		}

		watch([search, category], ([search, category]) => {
			const query = {}
			if (search) {
				query.search = search
			}
			if (category) {
				query.category = category
			}
			router.replace({ query })
			context.emit('update:modelValue', {
				search,
				category,
			})
		})

		onMounted(() => {
			M.updateTextFields()
		})

=======
	emits: ['search', 'changecat'],
	setup(_, context) {
>>>>>>> b9304e5ac8647de6123b0b53914328b12d0752c4
		return {
			search,
			category,
			changeSearch,
			changeCategory,
			clearFilter,
		}
	},
}
</script>

<style lang="scss" scoped>
.collection-item {
	padding: 0;
}

.collection-item a {
	display: block;
	padding: 10px 20px;
	width: 100%;
	height: 100%;
	color: #607d8b;
	cursor: pointer;
}

.collection-item a:hover {
	background-color: #607d8b;
	color: white;
}

.collection-item.active a {
	background-color: #90a4ae;
	color: white;
}
</style>
