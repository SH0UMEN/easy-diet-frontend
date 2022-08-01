<template>
	<v-form>
		<h2 class="text-center mb-6">Вход в систему</h2>
		<v-text-field label="Имя" v-model="name"></v-text-field>
		<v-text-field label="Пароль" type="password" v-model="name"></v-text-field>
	</v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('ds');

</script>

<style scoped lang="sass">

</style>