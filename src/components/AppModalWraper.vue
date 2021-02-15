<template>
	<teleport to="body">
		<div class="modal__wrap">
			<div class="modal__shadow" @click.prevent="close"></div>
			<div class="modal__box">
				<div class="modal_close right" @click.prevent="close">
					<i class="material-icons">close</i>
				</div>
				<slot />
			</div>
		</div>
	</teleport>
</template>

<script>
import { useStore } from 'vuex'

export default {
	name: 'AppModalWraper',
	setup() {
		const store = useStore()
		const close = () => {
			store.commit('setModal', false)
		}

		return {
			close,
		}
	},
}
</script>

<style>
.modal__wrap {
	position: fixed;
	margin: 0;
	padding: 0;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
}

.modal__shadow {
	position: fixed;
	margin: 0;
	padding: 0;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: black;
	opacity: 0.5;
	z-index: 101;
}

.modal__box {
	background-color: white;
	border-radius: 5px;
	position: fixed;
	top: 50%;
	left: 50%;
	padding: 10px;
	transform: translate(-50%, -50%);
	min-width: 400px;
	min-height: 300px;
	z-index: 102;
}

.modal_close {
	cursor: pointer;
}
</style>
