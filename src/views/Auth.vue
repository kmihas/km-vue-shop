<template>
	<div class="card-content">
		<div class="row">
			<div class="col s12">
				<ul class="tabs" id="tabs">
					<li class="tab col s6">
						<a :class="{ active: logintab }" href="#auth">Вход</a>
					</li>
					<li class="tab col s6">
						<a :class="{ active: !logintab }" href="#registration"
							>Регистрация</a
						>
					</li>
				</ul>
			</div>
			<div id="registration" class="col s12">
				<FormRegistration />
			</div>
			<div id="auth" class="col s12">
				<FormAuth />
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted } from 'vue'
import FormAuth from '../components/auth/FormAuth'
import FormRegistration from '../components/auth/FormRegistration'

export default {
	name: 'Auth',
	props: {
		logintab: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	setup() {
		onMounted(() => {
			const el = document.getElementById('tabs')
			M.Tabs.init(el)
		})

		return {}
	},
	components: {
		FormAuth,
		FormRegistration,
	},
}
</script>

<style scoped>
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
