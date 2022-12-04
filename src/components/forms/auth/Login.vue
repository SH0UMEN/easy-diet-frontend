<template>
	<v-form @submit.prevent="onSubmit" v-model="valid">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="usernameRules"></v-text-field>
		<v-text-field :label="t('auth.password.main')" type="password" v-model="password" :rules="passwordRules"></v-text-field>
		<v-btn type="submit" :loading="loading" :disabled="!valid || loading" color="yellow-accent-3" block>{{ t('auth.login.submit') }}</v-btn>
		<v-btn class="mt-2" :to="{ name: 'registration' }" variant="plain" block>{{ t('auth.registration.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
	import ValidationService from '@/services/validation';
	import { defineEmits, defineProps, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import useStore from '@/store/auth';
	import useService from '@/services/auth';

	interface Props {
		username?: string;
		password?: string;
	}

	const emit = defineEmits(['logged']);
	const props = defineProps<Props>();

	const service = useService();
	const store = useStore();
	const { t } = useI18n();

	const username = ref(props.username || '');
	const password = ref(props.password || '');
	const error = ref<string | null>(null);
	const loading = ref(false);
	const valid = ref(false);

	const usernameRules = reactive(ValidationService.username(t));
	const passwordRules = reactive(ValidationService.password(t));

	const onSubmit = async () => {
		error.value = null;
		loading.value = true;

		try {
			await store.login(username.value, password.value);

			emit('logged');
		} catch(e) {
			error.value = t(service.handleErrors(e));
		}

		loading.value = false;
	};
</script>