<template>
	<div class="d-flex align-center">
		<v-img :max-width="width" :width="width" :src="require('@/assets/food-cheese-stinky.svg')" class="mr-7"/>
		<span class="text-no-wrap">Easy Diet</span>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	type Properties = {
		width: number;
	}

	const properties = defineProps<Properties>();
</script>