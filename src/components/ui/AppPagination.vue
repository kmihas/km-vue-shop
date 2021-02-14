<template>
	<ul class="pagination">
		<li>
			<button
				class="btn active blue-grey darken-2"
				:class="{ disabled: curr === 1 }"
				@click.prevent="changePage(curr - 1)"
			>
				<i class="material-icons">chevron_left</i>
			</button>
		</li>

		<li v-for="item in last" :key="item">
			<button
				class="btn"
				:class="[
					{ 'blue-grey lighten-5 p-button': curr !== item },
					{ 'active blue-grey darken-2': curr === item },
				]"
				@click.prevent="changePage(item)"
			>
				{{ item }}
			</button>
		</li>

		<li>
			<button
				class="btn active blue-grey darken-2"
				@click.prevent="changePage(curr + 1)"
				:class="{ disabled: curr === last }"
			>
				<i class="material-icons">chevron_right</i>
			</button>
		</li>
	</ul>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

export default {
	name: 'AppPagination',
	props: {
		curr: {
			type: Number,
		},
		last: {
			type: Number,
		},
	},
	setup() {
		const route = useRoute()
		const router = useRouter()
		const changePage = (num) => {
			const query = {
				...route.query,
				page: num,
			}
			router.replace({ query })
		}

		return {
			changePage,
		}
	},
}
</script>

<style lang="scss" scoped>
.p-button {
	color: #263238;
}
</style>
