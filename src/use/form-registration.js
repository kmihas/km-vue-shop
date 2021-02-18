import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as yup from 'yup'

export function useFormRegistration() {
	const MIN_LENGTH = process.env.VUE_APP_PASS_MIN_LENGTH
	const store = useStore()
	const router = useRouter()
	const { handleSubmit, isSubmitting, submitCount } = useForm()

	const {
		value: email,
		errorMessage: emailError,
		handleChange: emailChange,
	} = useField(
		'emailReg',
		yup
			.string()
			.trim()
			.required('Введите email')
			.email('Введите корректный email')
	)

	const {
		value: pass,
		errorMessage: passError,
		handleChange: passChange,
	} = useField(
		'passwordReg',
		yup
			.string()
			.trim()
			.required('Введите пароль')
			.min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
	)

	const onSubmit = handleSubmit( async (values) => {
      try {
        await store.dispatch('auth/registrationUser', values)
				if (route.fullPath === '/auth') {
					router.push('/')
				}
      } catch (e) {}
	})

	const toManyTry = computed(() => {
		return submitCount.value >= 3
	})

	watch(toManyTry, (val) => {
		if (val) {
			setTimeout(() => {
				submitCount.value = 0
			}, 3000)
		}
	})

	return {
		email,
		emailError,
		emailChange,
		pass,
		passError,
		passChange,
		onSubmit,
		isSubmitting,
		toManyTry,
	}
}