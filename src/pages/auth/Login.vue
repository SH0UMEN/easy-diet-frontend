<template>
	<h2 class="text-center mb-6">{{ t('auth.login.title') }}</h2>
	<login @submit="onSubmit"></login>
</template>

<script setup lang="ts">
import Login from '@/components/forms/auth/Login.vue';
import router from '@/router';
import useStore from '@/store/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const onSubmit = (username: string, password: string) => {
	useStore().login(username, password).then((res) => {
		if(res)
			router.push({ name: 'index' });
	});
};
</script>