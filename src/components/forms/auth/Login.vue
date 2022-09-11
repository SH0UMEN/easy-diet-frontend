<template>
	<v-form @submit.prevent="onSubmit">
		<v-text-field :label="t('auth.username')" v-model="username" :rules="rules"></v-text-field>
		<v-text-field :label="t('auth.password')" type="password" v-model="password"></v-text-field>
		<v-btn type="submit" color="success" block>{{ t('auth.login.submit') }}</v-btn>
		<v-btn class="mt-2" block variant="plain">{{ t('auth.registration.title') }}</v-btn>
		<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
	</v-form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineEmits, defineProps, reactive, ref, computed } from 'vue';

interface Props {
	username?: string;
	password?: string;
	error?: string;
}

const { t } = useI18n();

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const username = ref(props.username);
const password = ref(props.password);
const error = computed(() => props.error);

const rules = reactive([
	(v: string) => v != '' || t('form.required'),
]);

const onSubmit = () => {
	emit('submit', username.value, password.value);
};
</script>