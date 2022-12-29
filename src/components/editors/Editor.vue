<template>
	<progress-circular v-if="loading"></progress-circular>

	<v-container v-else>
		<h2 class="text-center mb-6">{{ title }}</h2>
		<slot name="form" :submit="submit" :loading="formLoading" :errors="errors" :record="record"></slot>
	</v-container>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import { nextTick, onBeforeMount, reactive, ref } from 'vue';
	import CRUD from '@/services/crud';

	type Properties = {
		service: CRUD;
		title: string;
		id?: number;
	}

	const emit = defineEmits(['saved']);
	const properties = defineProps<Properties>();
	const service = properties.service;

	const record = ref(service.getPhantomRecord());
	const formLoading = ref(false);
	const loading = ref(true);

	const errors = reactive<Array<string>>([]);

	onBeforeMount(async () => {
		if(properties.id == null)
			return loading.value = false;

		const data = await service.read(properties.id);

		loading.value = false;

		nextTick(() => {
			record.value = data;
		});
	});

	const submit = async () => {
		errors.splice(0, errors.length);
		formLoading.value = true;

		try {
			await (record.value.id == null ? service.create(record.value) : service.update(record.value));
			emit('saved');
		} catch(e) {
			errors.push(t('errors.unknown'));
		}

		formLoading.value = false;
	};
</script>