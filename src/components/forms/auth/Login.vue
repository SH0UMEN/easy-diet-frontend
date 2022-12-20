<template>
	<v-form @submit.prevent="onSubmit" v-model="isValid">
		<v-text-field :label="t('auth.username')"
					  :rules="usernameRules"
					  v-model="username"
					  class="mb-2"
					  variant="solo">
		</v-text-field>
		<v-text-field :label="t('auth.password.main')"
					  :rules="passwordRules"
					  v-model="password"
					  type="password"
					  class="mb-2"
					  variant="solo">
		</v-text-field>
		<v-btn :disabled="!isValid || isLoading"
			   :loading="isLoading"
			   type="submit"
			   color="yellow-accent-3"
			   block>
			{{ t('auth.login.submit') }}
		</v-btn>
		<v-btn class="mt-2" :to="{ name: 'registration' }" variant="plain" block>{{ t('auth.registration.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
	import ValidationService from '@/services/validation';
	import { defineEmits, defineProps, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import useStore from '@/store/auth';
	import AuthService from '@/services/auth';

	interface Properties {
		username?: string;
		password?: string;
	}

	const emit = defineEmits(['logged']);
	const properties = defineProps<Properties>();

	const service = new AuthService();
	const store = useStore();
	const { t } = useI18n();

	const username = ref(properties.username || '');
	const password = ref(properties.password || '');
	const error = ref<string | null>(null);
	const isLoading = ref(false);
	const isValid = ref(false);

	const usernameRules = reactive(ValidationService.username(t));
	const passwordRules = reactive(ValidationService.password(t));

	const onSubmit = async () => {
		error.value = null;
		isLoading.value = true;

		try {
			await store.login(username.value, password.value);

			emit('logged');
		} catch(e) {
			error.value = t(service.handleErrors(e));
		}

		isLoading.value = false;
	};
</script>