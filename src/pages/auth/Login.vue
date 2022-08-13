<template>
	<login @submit="onSubmit"></login>
</template>

<script setup lang="ts">
import Login from '@/components/forms/auth/Login.vue';
import router from '@/router';
import useStore from '@/store/auth';

const onSubmit = (username: string, password: string) => {
	useStore().login(username, password).then((res) => {
		if(res)
			router.push({ name: 'index' });
	});
};
</script>