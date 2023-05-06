<template>
	<v-btn @click.prevent.stop="runAction" :loading="loading" v-bind="buttonProperties">
		<slot></slot>
	</v-btn>
</template>

<script setup lang="ts">
	import { defineProps, ref, toRefs } from 'vue';

	type ButtonProperties = {
		variant?: 'underlined' | 'outlined' | 'filled' | 'solo' | 'plain' | 'text';
		color?: string;
	}

	type Properties = {
		buttonProperties?: ButtonProperties;
		action: Function;
	}

	const properties = defineProps<Properties>();
	const { action, buttonProperties } = toRefs(properties);

	const loading = ref(false);

	const runAction = async () => {
		loading.value = true;

		await action.value();

		loading.value = false;
	}
</script>