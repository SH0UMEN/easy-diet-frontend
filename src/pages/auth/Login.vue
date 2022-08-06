<template>
	<login @login="onLogin"></login>
</template>

<script setup lang="ts">
import Login from '@/components/forms/Login.vue';
import router from '@/router';

const onLogin = () => {
	router.push({ name: 'index' });
}
</script>

<style scoped lang="sass">

</style>