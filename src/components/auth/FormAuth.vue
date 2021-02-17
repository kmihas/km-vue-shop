<template>
	<form class="white-text" @submit.prevent="onSubmit">
		<div :class="['input-field', { invalid: emailError }]">
			<label for="email">E-Mail</label>
			<input
				:class="['validate', { invalid: emailError }]"
				type="email"
				id="email"
				v-model.trim="email"
				@change="emailChange"
				@blur="emailChange"
			/>
			<span class="helper-text" :data-error="emailError"></span>
		</div>

		<div class="input-field">
			<label for="password">Пароль</label>
			<input
				:class="['validate', { invalid: passError }]"
				type="password"
				id="password"
				v-model.trim="pass"
				@change="passChange"
				@blur="passChange"
			/>
			<span class="helper-text" :data-error="passError"></span>
		</div>
		<div class="right-align">
			<button
				class="btn blue-grey darken-2 right-align waves-effect"
				type="submit"
				:disabled="isSubmitting || toManyTry"
			>
				Войти
			</button>
		</div>
	</form>
</template>

<script>
import { useFormLogin } from '@/use/form-login'

export default {
	name: 'Auth',
	setup() {
		return {
			...useFormLogin(),
		}
	},
}
</script>
