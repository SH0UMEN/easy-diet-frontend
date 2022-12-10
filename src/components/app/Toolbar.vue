<template>
	<div v-if="isShown">
		<v-btn icon="mdi-plus" :to="{ name: routeName + '-create' }" variant="flat" size="small" color="yellow-accent-3"></v-btn>
	</div>
</template>

<script setup lang="ts">
	import { RouteLocationNormalized } from 'vue-router';
	import { computed, ref } from 'vue';
	import router from '@/router';

	const routeName = ref(router.currentRoute.value.matched[0]?.name);

	const isShown = computed(() => routeName.value == 'dishes' || routeName.value == 'menus');

	router.beforeEach((to: RouteLocationNormalized) => {
		routeName.value = to.matched[0].name;
	});
</script>