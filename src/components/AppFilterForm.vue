<template>
	<div class="col s3 m3 x3">
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
		<div class="input-field col s12">
			<select v-model="perPageCurr">
				<option
					v-for="item in [4, 8, 12, 24]"
					:key="item"
					:value="+item"
					:class="{ selected: +item === +perPage }"
					>{{ item }}</option
				>
			</select>
			<label>Товаров на странице:</label>
		</div>
		<div class="col s12">
			<button
				class="btn-small blue-grey darken-2 waves-effect"
				@click="clearFilter"
			>
				Очистить
			</button>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'AppFilterForm',
	props: {
		categories: {
			type: Object,
			requared: true,
		},
		modelValue: {
			type: Object,
		},
	},
	emits: ['update:modelValue'],
	setup({ modelValue }, context) {
		const store = useStore()
		const router = useRouter()
		const search = ref(modelValue.search)
		const category = ref(modelValue.category)
		const page = ref(modelValue.page)
		const perPage = computed(() => store.getters['products/perPage'])
		const perPageCurr = ref(perPage.value)

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

		watch([search, category, perPageCurr], ([search, category, perPage]) => {
			const query = {}
			if (search) {
				query.search = search
			}
			if (category) {
				query.category = category
			}
			if (perPage) {
				query.page = '1'
				store.commit('products/setPerPage', +perPage)
			}
			router.replace({ query })
			context.emit('update:modelValue', {
				search,
				category,
				page,
			})
		})

		onMounted(() => {
			M.FormSelect.init(document.querySelectorAll('select'))
			M.updateTextFields()
		})

		return {
			search,
			category,
			changeSearch,
			changeCategory,
			clearFilter,
			perPage,
			perPageCurr,
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
