<template>
	<v-container class="fill-height">
		<progress-circular v-if="initialLoading"></progress-circular>

		<template v-else>
			<div v-if="records.length == 0 && search == '' && !searching" class="d-flex justify-center align-center fill-height flex-column">
				<slot name="no-data"></slot>
			</div>

			<template v-else>
				<v-row>
					<v-col>
						<h2 class="text-center">
							<slot name="title"></slot>
						</h2>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-text-field v-model="search" :label="t('dishes.list.search')" :loading="searching" variant="solo" hide-details class="mb-1"></v-text-field>
					</v-col>
				</v-row>

				<v-row v-if="!$vuetify.display.mobile">
					<v-col>
						<v-btn :to="{ name: 'dishes-create' }" color="yellow-accent-3" class="mb-1" size="large" block>
							{{ t('dishes.create.floating') }}
						</v-btn>
					</v-col>
				</v-row>

				<v-row>
					<slot name="list" :records="records"></slot>
				</v-row>
			</template>
		</template>
	</v-container>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import { defineProps } from 'vue';
	import CRUDGetParameters from '@/types/CRUDGetParameters';
	import CRUD from '@/services/crud';
	import IModel from '@/models/model';

	interface Properties {
		parameters?: CRUDGetParameters;
		service: CRUD;
	}

	const properties = withDefaults(defineProps<Properties>(), { parameters: () => new Object() });

	const records = ref<Array<IModel>>([]);
	const initialLoading = ref(true);
	const searching = ref(false);
	const search = ref('');

	const parameters = computed(() => properties.parameters);

	const service = properties.service;
	const { t } = useI18n();

	const load = async () => {
		const query = parameters.value;
		query.search = search.value == '' ? undefined : search.value;

		records.value = await service.read(query);

		initialLoading.value = false;
		searching.value = false;
	};

	const onDelete = async (id: number) => {
		await service.delete(id);
		load();
	};

	const loadDebounced = debounce(load, 250);

	watch(search, () => {
		searching.value = true;
		loadDebounced();
	});

	onBeforeMount(load);
</script>