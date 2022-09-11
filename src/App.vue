<template>
	<v-app>
		<app-bar></app-bar>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/components/app/AppBar.vue';
import { onBeforeMount } from 'vue';
import useStore from '@/store/auth';

onBeforeMount(() => {
	useStore().me();
});
</script>

<style lang="sass">
	@import "@/assets/sass/main.sass"
</style>
