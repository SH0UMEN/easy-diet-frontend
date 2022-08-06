<template>
	<v-form @submit.prevent="login">
		<h2 class="text-center mb-6" data-test="todo">Вход в систему</h2>
		<v-text-field label="Логин" v-model="username"></v-text-field>
		<v-text-field label="Пароль" type="password" v-model="password"></v-text-field>
		<v-btn type="submit" color="success" block>Войти</v-btn>
	</v-form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import useStore from '@/store/auth';

const emit = defineEmits(['login']);

const username = ref('');
const password = ref('');

const login = () => {
	useStore().login(username.value, password.value).then((res) => {
		emit('login');
	});
};
</script>

<style scoped lang="sass">

</style>