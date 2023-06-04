<template>
	<v-form v-model="valid">
		<v-text-field :label="t('auth.username')"
					  :rules="usernameRules"
					  v-model="username"
					  class="mb-2"
					  variant="solo">
		</v-text-field>

		<password v-model="password" :repeat="repeatPassword" class="mb-2"></password>

		<v-btn :disabled="!valid || loading"
			   :loading="loading"
			   type="submit"
			   color="yellow-accent-3"
			   block>
			{{ submitText }}
		</v-btn>

		<slot></slot>

		<div v-if="errors.length > 0">
			<v-alert v-for="error in errors" class="mt-6" type="error">{{ error }}</v-alert>
		</div>
	</v-form>
</template>

<script setup lang="ts">
	import Password from '@/components/controls/Password.vue';
	import ValidationService from '@/services/validation';
	import { computed, defineEmits, defineProps, reactive, ref, withDefaults } from 'vue';
	import { wrapModel } from '@/utils';
	import { useI18n } from 'vue-i18n';

	type Properties = {
		repeatPassword?: boolean;
		errors: Array<string>;
		submitText: string;
		loading: boolean;
		username: string;
		password: string;
	}

	const emit = defineEmits(['update:username', 'update:password']);
	const properties = withDefaults(
		defineProps<Properties>(),
		{ errors: () => [], submitText: '', loading: false, username: '', password: '', repeatPassword: false }
	);

	const { t } = useI18n();

	const username = wrapModel<string, Properties>(properties, emit, 'username');
	const password = wrapModel<string, Properties>(properties, emit, 'password');

	const loading = computed(() => properties.loading);

	const valid = ref(false);
	const repeatPassword = ref(properties.repeatPassword);

	const errors = reactive<Array<string>>(properties.errors);
	const usernameRules = reactive(ValidationService.username(t));
</script>