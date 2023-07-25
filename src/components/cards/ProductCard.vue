<template>
	<v-card class="d-flex flex-column fill-height">
		<v-card-text class="d-flex flex-column fill-height">
			<span class="text-subtitle-2">{{ product.product.i18n[$i18n.locale].title }}</span>

			<v-card-subtitle class="pl-0">
				<span class="mr-5">{{ t('products.kcal') }}: {{ product.product.kcal }}</span>
				<span class="mr-5">{{ t('products.protein') }}: {{ product.product.protein }}</span>
				<span class="mr-5">{{ t('products.fat') }}: {{ product.product.fat }}</span>
				<span>{{ t('products.carbohydrate') }}: {{ product.product.carbohydrate }}</span>
			</v-card-subtitle>

			<v-spacer></v-spacer>

			<v-text-field :hide-details="true"
						  v-model.number="product.grams"
						  type="number"
						  variant="outlined"
						  class="flex-grow-0 mt-2"
						  density="compact">
			</v-text-field>
		</v-card-text>

		<slot name="actions"></slot>
	</v-card>
</template>

<script setup lang="ts">
	import DishProductRelation from '@/models/dishProductRelation';
	import { defineProps } from 'vue';
	import { useI18n } from 'vue-i18n';

	type Properties = {
		product: DishProductRelation;
	}

	defineProps<Properties>();

	const { t } = useI18n();
</script>