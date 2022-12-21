<template>
	<h2 class="text-center mb-6">{{ t('auth.login.title') }}</h2>

	<auth-form @submit.prevent="onSubmit"
			   :submitText="t('auth.login.submit')"
			   v-model:username="username"
			   v-model:password="password"
			   :loading="loading"
			   :errors="errors">
		<v-btn class="mt-2" :to="{ name: 'registration' }" variant="plain" block>{{ t('auth.registration.title') }}</v-btn>
	</auth-form>
</template>

<script setup lang="ts">
	import AuthForm from '@/components/forms/AuthForm.vue';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';
	import { reactive, ref } from 'vue';
	import AuthService from '@/services/auth';
	import useStore from '@/store/auth';

	const { t } = useI18n();
	const service = new AuthService();
	const store = useStore();

	const username = ref('');
	const password = ref('');
	const loading = ref(false);

	const errors = reactive<Array<string>>([]);

	const onSubmit = async () => {
		errors.splice(0, errors.length);
		loading.value = true;

		try {
			await store.login(username.value, password.value);
			router.push({ name: 'dishes-mine' });
		} catch(e) {
			errors.push(t(service.handleErrors(e)));
		}

		loading.value = false;
	};
</script>