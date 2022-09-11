<template>
	<h2 class="text-center mb-6">{{ t('auth.login.title') }}</h2>
	<login @submit="onSubmit" :error="error"></login>
</template>

<script setup lang="ts">
import Login from '@/components/forms/auth/Login.vue';
import router from '@/router';
import useStore from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const error = ref<String | null>(null);
const store = useStore();
const { user } = storeToRefs(store);

const onSubmit = async (username: string, password: string) => {
	error.value = null;

	store.login(username, password).then(() => {
		if(user.value != null)
			router.push({ name: 'index' });
		else
			error.value = t('auth.login.error');
	});
};
</script>