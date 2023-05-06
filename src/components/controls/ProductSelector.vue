<template>
	<v-autocomplete v-model:search="parameters.search"
					v-model="product"
					:no-data-text="t('dishes.form.product.noData')"
					:item-title="'i18n.' + $i18n.locale + '.title'"
					:items="products"
					:loading="loading"
					:menu-props="{ maxWidth: 0 }"
					item-value="id"
					variant="solo"
					return-object
					no-filter>
		<template #item="{ props, item }">
			<v-list-item v-bind="props">
				<v-list-item-subtitle>
					<span class="mr-5">{{ t('products.kcal') }}: {{ item.raw.kcal }}</span>
					<span class="mr-5">{{ t('products.protein') }}: {{ item.raw.protein }}</span>
					<span class="mr-5">{{ t('products.fat') }}: {{ item.raw.fat }}</span>
					<span>{{ t('products.carbohydrate') }}: {{ item.raw.carbohydrate }}</span>
				</v-list-item-subtitle>
			</v-list-item>
		</template>

		<template #append-item>
			<pagination :total="total" v-model="parameters" v-model:page="page"></pagination>
		</template>
	</v-autocomplete>
</template>

<script setup lang="ts">
	import Pagination from '@/components/finders/Pagination.vue';
	import { defineEmits, reactive, ref, watch } from 'vue';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import ProductService from '@/services/product';
	import Product from '@/models/product';
	import CRUDPaginationParameters from '@/types/CRUDPaginationParameters';

	const emit = defineEmits(['selected']);

	const product = ref<Product | null>(null);
	const products = ref<Array<Product>>([]);
	const loading = ref(false);
	const total = ref(0);
	const page = ref(1);

	const { t, locale } = useI18n();
	const service = new ProductService();

	const parameters = ref<CRUDPaginationParameters>({ lang: locale.value });

	const fetch = async () => {
		const response = await service.read(parameters.value);

		total.value = response.count;
		products.value = response.results;
		loading.value = false;
	};

	const fetchDebounced = debounce(fetch, 250);

	watch(() => parameters.value.search, (value) => {
		if(value == '')
			return;

		loading.value = true;
		page.value = 1;

		fetchDebounced();
	});

	watch(page, () => {
		if(loading.value)
			return;

		loading.value = true;
		fetch();
	});

	watch(product, (value: Product | null) => {
		if(value == null)
			return;

		product.value = null;
		parameters.value.search = '';
		products.value = [];
		total.value = 0;

		emit('selected', value);
	});
</script>