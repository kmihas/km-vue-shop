<template>
	<div class="card-content">
		<div class="row">
			<div class="col s12">
				<ul class="tabs" id="tabs">
					<li class="tab col s6">
						<a
							:class="{ active: logintab }"
							href="#auth"
							@click.prevent="switchState"
							>Вход</a
						>
					</li>
					<li class="tab col s6">
						<a
							:class="{ active: !logintab }"
							href="#registration"
							@click.prevent="switchState"
							>Регистрация</a
						>
					</li>
				</ul>
			</div>
			<div id="auth" class="col s12">
				<AuthForm type="signIn" buttonText="Войти" v-if="formState" />
			</div>
			<div id="registration" class="col s12">
				<AuthForm
					type="signUp"
					buttonText="Зарегистрироваться"
					v-if="!formState"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import AuthForm from '../components/auth/AuthForm'

export default {
	name: 'Auth',
	props: {
		logintab: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	setup(props) {
		const formState = ref('')
		const switchState = () => {
			formState.value = !formState.value
		}
		onMounted(() => {
			props.logintab ? (formState.value = true) : (formState.value = false)
			const el = document.getElementById('tabs')
			M.Tabs.init(el)
		})

		return {
			formState,
			switchState,
		}
	},
	components: {
		AuthForm,
	},
}
</script>

<style scoped>
.card-content {
	width: 400px;
}

.tabs .tab a {
	color: #607d8b;
}

.tabs .tab a:hover,
.tabs .tab a.active {
	color: #263238;
}

.tabs .tab a:hover,
.tabs .tab a.active {
	color: #263238;
}
</style>
