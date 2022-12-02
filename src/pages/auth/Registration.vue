<template>
	<h2 class="text-center mb-6">{{ t('auth.registration.title') }}</h2>
	<registration @submit="onSubmit" :error="error"></registration>
</template>

<script setup lang="ts">
import Registration from '@/components/forms/auth/Registration.vue';
import useService from '@/services/auth';
import useStore from '@/store/auth';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import Error from '@/magic/error';
import { ref } from 'vue';
import { AxiosError } from 'axios';

const { t } = useI18n();

const store = useStore();
const service = useService();

const error = ref<string | null>(null);

const onSubmit = async (username: string, password: string) => {
	try {
		await service.registration(username, password);
	} catch (e) {
		if(e instanceof AxiosError) {
			switch(parseInt(e.request.response)) {
				case Error.UsernameIsBusy:
					error.value = t('errors.usernameIsBusy');
					break;
				case Error.DataNotValid:
					error.value = t('errors.dataNotValid');
			}
		}

		return;
	}

	await store.login(username, password);

	if(store.user != null)
		router.push({ name: 'dishes-mine' });
};
</script>