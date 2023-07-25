<template>
	<v-autocomplete v-model:search="parameters.search"
					v-model="product"
					:no-data-text="t('dishes.form.product.noData')"
					:item-title="titleProperty"
					:items="products"
					:loading="loading"
					:menu-props="{ maxWidth: 0 }"
					item-value="id"
					variant="solo"
					return-object
					no-filter>
		<template #item="{ props, item }">
			<slot :props="props" :record="item.raw"></slot>
		</template>

		<template #append-item>
			<pagination :total="total" v-model="parameters" v-model:page="page"></pagination>
		</template>
	</v-autocomplete>
</template>

<script setup lang="ts">
	import Pagination from '@/components/app/Pagination.vue';
	import { defineEmits, ref, watch, nextTick } from 'vue';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import CRUDPaginationParameters from '@/types/requests/CRUDPaginationParameters';
	import CRUD from '@/services/crud';
	import IModel from '@/models/model';
	import FilterParameters from '@/types/requests/FilterParameters';

	type Properties = {
		service: CRUD;
		titleProperty: string;
		excluded: Array<number>;
	}

	const properties = defineProps<Properties>();
	const emit = defineEmits(['selected']);

	const product = ref<IModel | null>(null);
	const products = ref<Array<IModel>>([]);
	const loading = ref(false);
	const total = ref(0);
	const page = ref(1);

	const { t, locale } = useI18n();

	const parameters = ref<CRUDPaginationParameters>({ lang: locale.value, search: '' });

	const fetch = async () => {
		const response = await properties.service.read(parameters.value);

		total.value = response.count;
		products.value = response.results;
		loading.value = false;
	};

	const fetchDebounced = debounce(fetch, 250);

	watch(() => parameters.value.search, () => {
		if(parameters.value.search == '')
			return clear();

		loading.value = true;
		page.value = 1;

		fetchDebounced();
	});

	watch(page, () => {
		if(loading.value)
			return;

		nextTick(() => {
			loading.value = true;
			fetch();
		});
	});

	watch(product, (value: IModel | null) => {
		if(value == null)
			return;

		clear();
		emit('selected', value);
	});

	watch(() => properties.excluded, (value: Array<number>) => {
		parameters.value.idNot = value;
	});

	const clear = () => {
		product.value = null;
		parameters.value.search = '';
		products.value = [];
		total.value = 0;
	}
</script>