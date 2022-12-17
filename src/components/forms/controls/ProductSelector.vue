<template>
	<v-autocomplete v-model:search="search"
					v-model="product"
					:no-data-text="t('dishes.create.form.product.noData')"
					:item-title="'i18n.' + $i18n.locale + '.title'"
					:items="products"
					:loading="loading"
					:menu-props="{ maxWidth: 0 }"
					item-value="id"
					variant="solo"
					return-object
					no-filter>
		<template v-slot:item="{ props, item }">
			<v-list-item v-bind="props">
				<v-list-item-subtitle>
					<span class="mr-5">ккал: {{ item.raw.kcal }}</span>
					<span class="mr-5">б: {{ item.raw.protein }}</span>
					<span class="mr-5">ж: {{ item.raw.fat }}</span>
					<span>у: {{ item.raw.carbohydrate }}</span>
				</v-list-item-subtitle>
			</v-list-item>
		</template>

		<template v-slot:append-item>
			<v-pagination :length="pageCount"
						  :total-visible="$vuetify.display.mobile ? 1 : 7"
						  v-if="pageCount > 1"
						  v-model="page"
						  rounded="circle">
			</v-pagination>
		</template>
	</v-autocomplete>
</template>

<script setup lang="ts">
	import { computed, defineEmits, ref, watch } from 'vue';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import ProductService from '@/services/product';
	import Product from '@/models/product';

	const emit = defineEmits(['selected']);

	const search = ref('');
	const page = ref(1);
	const products = ref<Array<Product>>([]);
	const total = ref(0);
	const loading = ref(false);
	const viewOnPage = ref(6);
	const product = ref<Product | null>(null);

	const pageCount = computed(() => {
		return Math.ceil(total.value/viewOnPage.value);
	});

	const { t, locale } = useI18n();
	const service = new ProductService();

	const fetch = async () => {
		if(search.value == '') {
			products.value = [];
			total.value = 0;

			return;
		}

		loading.value = true;

		const response = await service.read({
			offset: (page.value - 1) * viewOnPage.value,
			lang: locale.value,
			limit: viewOnPage.value,
			search: search.value
		});

		total.value = response.count;
		products.value = response.results;

		loading.value = false;
	};

	const fetchDebounced = debounce(fetch, 250);

	watch(search, () => {
		page.value = 1;
		fetchDebounced();
	});

	watch(page, fetch);

	watch(product, (value: Product | null) => {
		if(value == null)
			return;

		product.value = null;
		search.value = '';
		emit('selected', value);
	});
</script>