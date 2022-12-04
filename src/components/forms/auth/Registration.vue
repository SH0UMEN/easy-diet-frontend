<template>
	<v-form @submit.prevent="onSubmit" v-model="valid">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="usernameRules"></v-text-field>
		<password v-model="password"></password>
		<v-btn type="submit" :loading="loading" :disabled="!valid || loading" color="yellow-accent-3" block>{{ t('auth.registration.submit') }}</v-btn>
		<v-btn class="mt-2" :to="{ name: 'login' }" variant="plain" block>{{ t('auth.login.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
	import Password from '@/components/forms/controls/Password.vue';
	import ValidationService from '@/services/validation';
	import useService from '@/services/auth';
	import { defineEmits, defineProps, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	interface Props {
		username?: string;
		password?: string;
	}

	const emit = defineEmits(['registered']);
	const props = defineProps<Props>();

	const { t } = useI18n();

	const usernameRules = reactive(ValidationService.username(t));

	const username = ref(props.username || '');
	const password = ref(props.password || '');
	const error = ref<string | null>(null);
	const valid = ref(false);
	const loading = ref(false);

	const service = useService();

	const onSubmit = async () => {
		error.value = null;
		loading.value = true;

		try {
			await service.registration(username.value, password.value);

			emit('registered', username.value, password.value);
		} catch(e) {
			error.value = t(service.handleErrors(e));
		}

		loading.value = false;
	};
</script>