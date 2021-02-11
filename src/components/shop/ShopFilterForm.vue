<template>
	<div class="col s2 m2 x2">
		<div class="input-field">
			<input
				type="text"
				id="search"
				v-model="searchString"
				@change="changeSearch"
			/>
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
					:class="['collection-item', { active: item.type === category }]"
					v-for="item in categoryes"
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
import { useFilterForm } from '../../use/filter-form'

export default {
	name: 'ShopFilter',
	props: {
		categoryes: {
			type: Object,
			requared: true,
		},
		category: {
			type: String,
			requared: true,
		},
	},
	emits: ['search', 'changecat'],
	setup(_, context) {
		return {
			...useFilterForm(context),
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
