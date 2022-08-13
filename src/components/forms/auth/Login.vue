<template>
	<v-form @submit.prevent="onSubmit">
		<h2 class="text-center mb-6" data-test="todo">Вход в систему</h2>
		<v-text-field label="Логин" v-model="username" :rules="rules" data-test="username"></v-text-field>
		<v-text-field label="Пароль" type="password" v-model="password" data-test="password"></v-text-field>
		<v-btn type="submit" color="success" block data-test="submit">{{ t('auth.login.submit') }}</v-btn>
	</v-form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineEmits, defineProps, reactive, ref } from 'vue';

interface Props {
	username?: string;
	password?: string;
}

const { t } = useI18n();

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const username = ref(props.username);
const password = ref(props.password);

const rules = reactive([
	(v: string) => v != '' || t('form.required'),
]);

const onSubmit = () => {
	emit('submit', username.value, password.value);
};
</script>