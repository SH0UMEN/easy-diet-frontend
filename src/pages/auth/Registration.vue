<template>
	<h2 class="text-center mb-6">{{ t('auth.registration.title') }}</h2>

	<auth-form @submit.prevent="onSubmit"
			   :submitText="t('auth.registration.submit')"
			   v-model:username="username"
			   v-model:password="password"
			   v-model:email="email"
			   :registration="true"
			   :loading="loading"
			   :errors="errors">
		<v-btn class="mt-2" :to="{ name: 'login' }" variant="plain" block>{{ t('auth.login.title') }}</v-btn>
	</auth-form>
</template>

<script setup lang="ts">
	import AuthForm from '@/components/forms/AuthForm.vue';
	import { reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import AuthService from '@/services/auth';
	import useStore from '@/store/auth';
	import router from '@/router';

	const { t } = useI18n();
	const service = new AuthService();
	const store = useStore();

	const username = ref('');
	const password = ref('');
	const email = ref('');
	const loading = ref(false);

	const errors = reactive<Array<string>>([]);

	const onSubmit = async () => {
		errors.splice(0, errors.length);
		loading.value = true;

		try {
			await service.registration({ username: username.value, password: password.value, email: email.value });
			router.push({ name: 'verify' });
		} catch(e) {
			errors.push(t(service.handleErrors(e)));
		}

		loading.value = false;
	};
</script>