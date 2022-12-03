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
	import { onBeforeMount, onMounted, ref, getCurrentInstance, watch } from 'vue';
	import useStore from '@/store/auth';
	import { RouteLocationNormalized } from 'vue-router';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';

	const showNavigation = ref(false);

	const { t } = useI18n();

	const onNavToggled = () => {
		showNavigation.value = !showNavigation.value;
	};

	const updateTitle = (route: RouteLocationNormalized) => {
		let title = t('titles.main');
		if(route.meta.title != null)
			title = t(String(route.meta.title)) + ' | ' + title;

		document.title = title;
	};

	onBeforeMount(() => {
		useStore().me();
	});

	onMounted(() => {
		const instance = getCurrentInstance();
		const vuetify = instance!.proxy!.$vuetify!;
		const i18n = instance!.proxy!.$i18n!;

		showNavigation.value = !vuetify.display.mobile;

		watch(() => i18n.locale, () => {
			updateTitle(router.currentRoute.value);
		});
	});

	router.beforeEach(updateTitle);
</script>

<style lang="sass">
	@import "@/assets/sass/main.sass"
</style>
