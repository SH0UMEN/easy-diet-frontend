<template>
	<v-form @submit.prevent="onSubmit" v-model="valid">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="rules"></v-text-field>
		<v-text-field :label="t('auth.email')" v-model="email" :rules="rules"></v-text-field>
		<v-text-field :label="t('auth.password.main')" type="password" v-model="password" :rules="rules" @input="onPasswordInput"></v-text-field>
		<v-text-field :label="t('auth.password.repeat')"
					  type="password"
					  v-model="repeatedPassword"
					  :error-messages="passwordErrors"
					  :rules="rules"
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

interface Props {
	username?: string;
	email?: string;
	password?: string;
	repeatedPassword?: string;
	error?: string;
}

const { t } = useI18n();

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const username = ref(props.username);
const email = ref(props.email);
const password = ref(props.password);
const repeatedPassword = ref(props.repeatedPassword);
const error = computed(() => props.error);

const valid = ref(false);

const passwordErrors = reactive<Array<string>>([]);

const rules = reactive([
	(v: string) => v != '' || t('form.required')
]);

const onSubmit = () => {
	emit('submit', username.value, email.value, password.value);
};

const onPasswordInput = () => {
	passwordErrors.pop();

	if(repeatedPassword.value != null && repeatedPassword.value != '' && repeatedPassword.value != password.value)
		passwordErrors.push(t('auth.password.error'));
}
</script>