<template>
	<div v-if="isShown">
		<v-btn icon="mdi-plus" :to="{ name: routeName + '-create' }" variant="flat" size="small" color="yellow-accent-3"></v-btn>
	</div>
</template>

<script setup lang="ts">
	import { RouteLocationNormalized, RouteRecordName, useRoute, useRouter } from 'vue-router';
	import { computed, onMounted, ref } from 'vue';

	const routeName = ref<RouteRecordName | undefined>();

	const isShown = computed(() => routeName.value == 'dishes' || routeName.value == 'menus');
	const router = useRouter();
	const route = useRoute();

	onMounted(async () => {
		await router.isReady();

		routeName.value = route.matched[1]?.name;
	});

	router.beforeEach((to: RouteLocationNormalized) => {
		routeName.value = to.matched[1]?.name;
	});
</script>