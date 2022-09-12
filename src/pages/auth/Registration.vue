<template>
	<h2 class="text-center mb-6">{{ t('auth.registration.title') }}</h2>
	<registration @submit="onSubmit"></registration>
</template>

<script setup lang="ts">
import Registration from '@/components/forms/auth/Registration.vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';

const { t } = useI18n();

const onSubmit = async (username: string, email: string, password: string) => {
	// store.login(username, password).then(() => {
	// 	if(user.value != null)
	// 		router.push({ name: 'index' });
	// 	else
	// 		error.value = t('auth.login.error');
	// });
};
</script>