<template>
	<menu-view :id="id"></menu-view>
</template>

<script setup lang="ts">
	import MenuView from '@/components/views/MenuView.vue';
	import { toRefs } from 'vue';

	type Properties = {
		id: number;
	}

	const properties = defineProps<Properties>();
	const { id } = toRefs(properties);
</script>