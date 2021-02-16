<template>
	<AppModalWrapper @close="$emit('reject')">
		<h5>{{ title }}</h5>
		<div class="right-align">
			<button
				class="btn red darken-2 waves-effect"
				@click.prevent="$emit('reject')"
			>
				Отменить
			</button>
			&nbsp;
			<button
				class="btn blue-grey darken-2 waves-effect"
				@click.prevent="$emit('confirm')"
			>
				Продолжить
			</button>
		</div>
	</AppModalWrapper>
</template>

<script>
import AppModalWrapper from '../AppModalWrapper'

export default {
	name: 'AppConfirm',
	props: {
		title: {
			type: String,
		},
	},
	emits: ['confirm', 'reject'],
	setup() {
		return {}
	},
	components: {
		AppModalWrapper,
	},
}
</script>
