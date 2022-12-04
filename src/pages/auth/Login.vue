<template>
	<h2 class="text-center mb-6">{{ t('auth.login.title') }}</h2>
	<login @logged="onLogged"></login>
</template>

<script setup lang="ts">
	import Login from '@/components/forms/auth/Login.vue';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const onLogged = () => {
		router.push({ name: 'dishes-mine' });
	};
</script>