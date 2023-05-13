<template>
	<loader :id="id" :service="service" @load="onLoad">
		<template #form="{ record }">
			<h2 class="text-center mb-6">{{ title }}</h2>
			<slot name="form" :submit="submit" :loading="formLoading" :errors="errors" :record="record"></slot>
		</template>
	</loader>
</template>

<script setup lang="ts">
	import Loader from '@/components/loaders/Loader.vue';
	import { reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import CRUD from '@/services/crud';
	import IModel from '@/models/model';

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

	const errors = reactive<Array<string>>([]);

	const { t } = useI18n();

	const onLoad = (value: IModel) => {
		record.value = value;
	};

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