<template>
	<v-card class="d-flex flex-column">
		<v-img v-if="isString(menu.image)" :src="menu.image" height="250" class="flex-grow-0" cover></v-img>

		<v-card-item>
			<v-card-title>{{ menu.title }}</v-card-title>

			<v-card-subtitle class="my-2">
				<div>
					{{ t('products.protein') }}/{{ t('products.fat') }}/{{ t('products.carbohydrate') }}:
					{{ nutritionValue.proteinFull.toFixed(2) }}/{{ nutritionValue.fatFull.toFixed(2) }}/{{ nutritionValue.carbohydrateFull.toFixed(2) }}
				</div>

				<div>{{ t('products.kcal') }}: {{ Math.round(nutritionValue.kcalFull) }}</div>
			</v-card-subtitle>
		</v-card-item>

		<v-card-text>
			<v-row v-if="menu.overallScore > 0" align="center" class="mx-0 mb-4">
				<v-rating :model-value="menu.overallScore" color="amber" density="compact" half-increments readonly size="small"></v-rating>
				<div class="text-grey ms-4">{{ menu.overallScore }} ({{ menu.scoresCount }})</div>
			</v-row>

			<div class="mt-4">{{ menu.descriptionShort }}</div>
		</v-card-text>

		<div class="d-flex align-center justify-end">
			<slot name="actions"></slot>
		</div>
	</v-card>
</template>

<script setup lang="ts">
	import { computed, defineProps, toRefs } from 'vue';
	import Menu from '@/models/menu';
	import { useI18n } from 'vue-i18n';
	import { isString } from '@/utils';
	import MenuService from '@/services/menu';

	type Properties = {
		menu: Menu;
	}

	const properties = defineProps<Properties>();

	const { menu } = toRefs(properties);
	const { t } = useI18n();

	const nutritionValue = computed(() => MenuService.getNutritionValue(menu.value));
</script>