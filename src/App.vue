<template>
	<v-app>
		<app-bar v-if="$vuetify.display.mobile" @navToggled="onNavToggled"></app-bar>
		<navigation v-model="showNavigation"></navigation>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
	import Navigation from '@/components/app/Navigation.vue';
	import AppBar from '@/components/app/AppBar.vue';
	import { onBeforeMount, onMounted, ref, getCurrentInstance } from 'vue';
	import useStore from '@/store/auth';

	const showNavigation = ref(false);

	const onNavToggled = () => {
		showNavigation.value = !showNavigation.value;
	};

	onBeforeMount(() => {
		useStore().me();
	});

	onMounted(() => {
		const instance = getCurrentInstance();
		const vuetify = instance!.proxy!.$vuetify!;

		showNavigation.value = !vuetify.display.mobile;
	});
</script>

<style lang="sass">
	@import "@/assets/sass/main.sass"
</style>
