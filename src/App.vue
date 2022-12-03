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
	import { RouteLocationNormalized } from 'vue-router';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';

	const showNavigation = ref(false);

	const { t } = useI18n();

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

	router.beforeEach((to: RouteLocationNormalized) => {
		if(to.meta.title)
			document.title = t(String(to.meta.title)) + ' | ' + t('titles.main');
	});
</script>

<style lang="sass">
	@import "@/assets/sass/main.sass"
</style>
