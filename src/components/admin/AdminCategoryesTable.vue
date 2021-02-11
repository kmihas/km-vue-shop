<template>
	<div>
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Тип(<small>на английском</small>)</th>
					<th>Название</th>
					<th></th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="item in categoryes" :key="item.id">
					<td></td>
					<td>{{ item.type }}</td>
					<td>{{ item.title }}</td>
					<td><i class="material-icons">edit</i></td>
					<td><i class="material-icons">delete</i></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'AdminCategoryesTable',
	props: {
		categoryes: {
			type: Array,
			required: true,
		},
	},
	setup() {
		return {}
	},
}
</script>
