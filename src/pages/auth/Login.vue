<template>
	<v-form @submit.prevent="login">
		<h2 class="text-center mb-6">Вход в систему</h2>
		<v-text-field label="Логин" v-model="username"></v-text-field>
		<v-text-field label="Пароль" type="password" v-model="password"></v-text-field>
		<v-btn type="submit" color="success" block>Войти</v-btn>
	</v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useStore from '@/store/auth';

const username = ref('');
const password = ref('');

const login = () => {
	useStore().login(username.value, password.value);
};

</script>

<style scoped lang="sass">

</style>