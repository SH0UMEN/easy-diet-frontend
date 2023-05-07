<template>
	<v-container class="fill-height">
		<progress-circular v-if="loading"></progress-circular>

		<div v-show="!loading">
			<div v-if="records.length === 0 && parameters.search === '' && !searching" class="d-flex justify-center align-center fill-height flex-column">
				<span class="text-h6 mb-4">{{ noData }}</span>
				<v-btn :to="{ name: createUrl }" color="yellow-accent-3">{{ createText }}</v-btn>
			</div>

			<template v-else>
				<v-row>
					<v-col>
						<h2 class="text-center">{{ title }}</h2>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-text-field v-model="parameters.search" :label="t('finder.search')" :loading="searching" variant="solo" hide-details class="mb-1"></v-text-field>
					</v-col>
				</v-row>

				<v-row v-if="!$vuetify.display.mobile">
					<v-col>
						<v-btn :to="{ name: createUrl }" color="yellow-accent-3" class="mb-1" size="large" block>{{ createText }}</v-btn>
					</v-col>
				</v-row>

				<v-row>
					<slot name="list" :records="records" :delete-by-id="deleteById"></slot>
				</v-row>
			</template>

			<v-row>
				<v-col>
					<pagination :total="total" v-model:page="page" v-model="parameters"></pagination>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import Pagination from '@/components/app/Pagination.vue';
	import { defineProps, nextTick, watch } from 'vue';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import { ref } from 'vue';
	import CRUDPaginationParameters from '@/types/CRUDPaginationParameters';
	import IModel from '@/models/model';
	import CRUD from '@/services/crud';

	type Properties = {
		parameters?: CRUDPaginationParameters;
		createText: string;
		createUrl: string;
		noData: string;
		title: string;
		service: CRUD;
	}

	const properties = withDefaults(defineProps<Properties>(), { parameters: () => ({}) });

	const parameters = ref(properties.parameters);
	const records = ref<Array<IModel>>([]);
	const loading = ref(true);
	const searching = ref(false);
	const total = ref(0);
	const page = ref(1);

	const service = properties.service;
	const { t } = useI18n();

	const fetch = async () => {
		const response = await service.read(parameters.value);

		records.value = response.results;
		total.value = response.count;
		loading.value = false;
		searching.value = false;
	};

	const deleteById = async (id: number) => {
		await service.delete(id);
		await fetch();
	};

	const fetchDebounced = debounce(fetch, 250);

	watch(() => parameters.value.search, () => {
		searching.value = true;
		page.value = 1;

		fetchDebounced();
	});

	watch(page, () => {
		if(searching.value)
			return;

		nextTick(() => {
			loading.value = true;
			fetch();
		});
	}, { immediate: true });
</script>