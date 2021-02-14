<template>
	<teleport to="body">
		<transition name="fade">
			<div class="modal__wrap">
				<div class="modal__shadow"></div>
				<div class="modal__box">
					<div class="modal_close right">
						<i class="material-icons">close</i>
					</div>
					<slot />
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
export default {
	name: 'AppModalWraper',
	setup() {
		return {}
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
	position: fixed;
	top: 50%;
	left: 50%;
	padding: 10px;
	transform: translate(-50%, -50%);
	min-width: 200px;
	min-height: 300px;
	z-index: 102;
}

.modal_close {
	cursor: pointer;
}
</style>
