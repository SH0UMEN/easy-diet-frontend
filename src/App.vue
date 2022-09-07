<template>
	<v-app>
		<app-bar></app-bar>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import useStore from '@/store/auth';
import { onBeforeMount } from 'vue';
import AppBar from '@/components/app/AppBar.vue';

onBeforeMount(() => {
	useStore().me();
});
</script>
