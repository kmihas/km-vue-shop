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
				<td><i class="material-icons">edit</i></td>
				<td><i class="material-icons">delete</i></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'AdminProductsTable',
	props: {
		products: {
			type: Array,
			requared: true,
			default: [],
		},
		categoryes: {
			type: Array,
			requared: true,
		},
	},
	setup(props) {
		const getCategory = (string) => {
			const idx = props.categoryes.findIndex((el) => el.type === string)
			return props.categoryes[idx].title
		}

		return {
			getCategory,
		}
	},
}
</script>
