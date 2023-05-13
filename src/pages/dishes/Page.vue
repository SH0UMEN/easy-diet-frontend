<template>
	<dish-view :id="id"></dish-view>
</template>

<script setup lang="ts">
	import DishView from '@/components/views/DishView.vue';
	import { toRefs } from 'vue';

	type Properties = {
		id: number;
	}

	const properties = defineProps<Properties>();
	const { id } = toRefs(properties);
</script>