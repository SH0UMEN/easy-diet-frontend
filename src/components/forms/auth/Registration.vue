<template>
	<v-form @submit.prevent="onSubmit" v-model="isValid">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="usernameRules" variant="solo" class="mb-2"></v-text-field>
		<password v-model="password" class="mb-2"></password>
		<v-btn :loading="isLoading" :disabled="!isValid || isLoading"
			   type="submit"
			   class="mt-2"
			   color="yellow-accent-3"
			   block>
			{{ t('auth.registration.submit') }}
		</v-btn>
		<v-btn class="mt-2" :to="{ name: 'login' }" variant="plain" block>{{ t('auth.login.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
	import Password from '@/components/forms/controls/Password.vue';
	import ValidationService from '@/services/validation';
	import AuthService from '@/services/auth';
	import { defineEmits, defineProps, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	interface Properties {
		username?: string;
		password?: string;
	}

	const emit = defineEmits(['registered']);
	const properties = defineProps<Properties>();

	const { t } = useI18n();

	const usernameRules = reactive(ValidationService.username(t));

	const username = ref(properties.username || '');
	const password = ref(properties.password || '');
	const error = ref<string | null>(null);
	const isValid = ref(false);
	const isLoading = ref(false);

	const service = new AuthService();

	const onSubmit = async () => {
		error.value = null;
		isValid.value = true;

		try {
			await service.registration({ username: username.value, password: password.value });

			emit('registered', username.value, password.value);
		} catch(e) {
			error.value = t(service.handleErrors(e));
		}

		isLoading.value = false;
	};
</script>