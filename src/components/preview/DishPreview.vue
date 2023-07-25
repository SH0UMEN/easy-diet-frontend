<template>
	<div>
		<span class="mr-5">{{ Math.round(nutritionValue.weight) }} {{ t('products.grams') }}</span>
		<span class="mr-5">{{ t('products.kcal') }}: {{ Math.round(nutritionValue.kcalFull) }}</span>
		<span class="mr-5">{{ t('products.protein') }}: {{ nutritionValue.proteinFull.toFixed(2) }}</span>
		<span class="mr-5">{{ t('products.fat') }}: {{ nutritionValue.fatFull.toFixed(2) }}</span>
		<span>{{ t('products.carbohydrate') }}: {{ nutritionValue.carbohydrateFull.toFixed(2) }}</span>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { toRefs, computed } from 'vue';
	import DishService from '@/services/dish';
	import Dish from '@/models/dish';

	type Properties = {
		dish: Dish;
	}

	const properties = defineProps<Properties>();

	const { t } = useI18n();

	const { dish } = toRefs(properties);

	const nutritionValue = computed(() => DishService.getNutritionValue(dish.value));
</script>