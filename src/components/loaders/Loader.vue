<template>
	<progress-circular v-if="loading"></progress-circular>

	<v-container v-else>
		<slot name="form" :record="record"></slot>
	</v-container>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import { nextTick, onBeforeMount, ref } from 'vue';
	import CRUD from '@/services/crud';
	import router from '@/router';

	type Properties = {
		service: CRUD;
		id?: number;
	}

	const emit = defineEmits(['load']);
	const properties = defineProps<Properties>();
	const service = properties.service;

	const record = ref(service.getPhantomRecord());
	const loading = ref(true);

	onBeforeMount(async () => {
		if(properties.id == null)
			return loading.value = false;

		try {
			const data = await service.read(properties.id);

			nextTick(() => {
				record.value = data;
				emit('load', data);
			});
		} catch {
			await router.push({ name: 'index' });
		} finally {
			loading.value = false;
		}
	});
</script>