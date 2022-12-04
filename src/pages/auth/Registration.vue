<template>
	<h2 class="text-center mb-6">{{ t('auth.registration.title') }}</h2>
	<registration @registered="onRegistered"></registration>
</template>

<script setup lang="ts">
	import Registration from '@/components/forms/auth/Registration.vue';
	import { useI18n } from 'vue-i18n';
	import useStore from '@/store/auth';
	import router from '@/router';

	const { t } = useI18n();
	const store = useStore();

	const onRegistered = async (username: string, password: string) => {
		try {
			await store.login(username, password);
		} catch(e) {
			return router.push({ name: 'login' });
		}

		router.push({ name: 'dishes-mine' });
	};
</script>