<template>
	<v-card class="d-flex flex-column">
		<v-img :src="dish.image" height="250" class="flex-grow-0" cover></v-img>

		<v-card-item>
			<v-card-title>{{ dish.title }}</v-card-title>

			<v-card-subtitle class="my-2">
				<div>{{ t('products.protein') }}/{{ t('products.fat') }}/{{ t('products.carbohydrate') }}: {{ protein }}/{{ fat }}/{{ carbohydrate }}</div>
				<div>{{ t('products.kcal') }}: {{ kcal }}</div>
			</v-card-subtitle>
		</v-card-item>

		<v-card-text>
			<v-row align="center" class="mx-0 mb-4">
				<v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly size="small"></v-rating>
				<div class="text-grey ms-4">4.5 (413)</div>
			</v-row>

			<div class="mt-4">{{ dish.descriptionShort }}</div>
		</v-card-text>

		<slot name="actions"></slot>
	</v-card>
</template>

<script setup lang="ts">
	import { computed, defineProps, toRefs } from 'vue';
	import { useI18n } from 'vue-i18n';
	import Dish from '@/models/dish';

	type Properties = {
		dish: Dish;
	}

	const properties = defineProps<Properties>();

	const { dish } = toRefs(properties);
	const { t } = useI18n();

	const weight = computed(() => {
		let result = 0;
		dish.value.dishProductRelations.map((el) => result += el.grams);

		return result;
	});

	const calculateNutritionValue = (name: 'protein' | 'fat' | 'carbohydrate' | 'kcal') => {
		let result = 0;

		for(let relation of dish.value.dishProductRelations)
			result += relation.grams/weight.value * relation.product[name];

		return result;
	};

	const carbohydrate = computed(() => calculateNutritionValue('carbohydrate').toFixed(2));
	const protein = computed(() => calculateNutritionValue('protein').toFixed(2));
	const fat = computed(() => calculateNutritionValue('fat').toFixed(2));
	const kcal = computed(() => Math.round(calculateNutritionValue('kcal')));
</script>