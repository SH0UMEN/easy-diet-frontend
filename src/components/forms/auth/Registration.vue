<template>
	<v-form @submit.prevent="onSubmit" v-model="valid">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="usernameRules"></v-text-field>
		<v-text-field :label="t('auth.password.main')" type="password" v-model="password" :rules="passwordRules" @input="onPasswordInput"></v-text-field>
		<v-text-field :label="t('auth.password.repeat')"
					  type="password"
					  v-model="repeatedPassword"
					  :error-messages="passwordErrors"
					  :rules="passwordRules"
					  @input="onPasswordInput">
		</v-text-field>
		<v-btn type="submit" :disabled="!valid" color="success" block>{{ t('auth.registration.submit') }}</v-btn>
		<v-btn class="mt-2" :to="{ name: 'login' }" variant="plain" block>{{ t('auth.login.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineEmits, defineProps, reactive, ref, computed } from 'vue';
import ValidationService from '@/services/validation';

const { t } = useI18n();

interface Props {
	username?: string;
	password?: string;
	repeatedPassword?: string;
	error?: string;
}

const props = defineProps<Props>();

const username = ref(props.username);
const password = ref(props.password);
const repeatedPassword = ref(props.repeatedPassword);
const error = computed(() => props.error);

const valid = ref(false);

const passwordErrors = reactive<Array<string>>([]);

const usernameRules = reactive(ValidationService.username(t));
const passwordRules = reactive(ValidationService.password(t));

const emit = defineEmits(['submit']);

const onSubmit = () => {
	emit('submit', username.value, password.value);
};

const onPasswordInput = () => {
	passwordErrors.pop();

	if(repeatedPassword.value != null && repeatedPassword.value != '' && repeatedPassword.value != password.value)
		passwordErrors.push(t('auth.password.error'));
}
</script>