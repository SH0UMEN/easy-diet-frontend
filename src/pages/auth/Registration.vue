<template>
	<h2 class="text-center mb-6">{{ t('auth.registration.title') }}</h2>
	<registration @registered="onRegistered"></registration>
</template>

<script setup lang="ts">
	import Registration from '@/components/forms/auth/Registration.vue';
	import useStore from '@/store/auth';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';
	import { ref } from 'vue';

	const error = ref<string | null>(null);

	const { t } = useI18n();
	const store = useStore();

	const onRegistered = async (username: string, password: string) => {
		await store.login(username, password);

		if(store.user != null)
			router.push({ name: 'dishes-mine' });
	};
</script>