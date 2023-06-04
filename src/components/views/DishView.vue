<template>
	<loader :id="id" :service="service" @load="onLoad">
		<template #form="{ record }: { record: Dish }">
			<h2 class="text-center mb-6">{{ record.title }}</h2>

			<v-responsive max-width="768" class="mx-auto">
				<v-img :src="record.image as string"></v-img>

				<v-table v-if="nutritionValue != null" density="compact" class="mt-6">
					<template #top>
						<div class="px-4 pt-2 mb-2 text-subtitle-1 text-grey-lighten-1">{{ t('dishes.view.nutritionValue') }}</div>
						<v-divider></v-divider>
					</template>

					<tbody>
						<tr>
							<td>{{ t('dishes.view.kcal') }}</td>
							<td class="text-right">{{ Math.round(nutritionValue.kcal) }}&nbsp;{{ t('products.kcal') }}</td>
						</tr>

						<tr>
							<td>{{ t('dishes.view.protein') }}</td>
							<td class="text-right">{{ nutritionValue.protein.toFixed(2) }}</td>
						</tr>

						<tr>
							<td>{{ t('dishes.view.fat') }}</td>
							<td class="text-right">{{ nutritionValue.fat.toFixed(2) }}</td>
						</tr>

						<tr>
							<td>{{ t('dishes.view.carbohydrate') }}</td>
							<td class="text-right">{{ nutritionValue.carbohydrate.toFixed(2) }}</td>
						</tr>
					</tbody>
				</v-table>

				<v-table density="compact" class="mt-6">
					<template #top>
						<div class="px-4 pt-2 mb-2 text-subtitle-1 text-grey-lighten-1">{{ t('dishes.view.ingredients') }}</div>
						<v-divider></v-divider>
					</template>

					<tbody>
						<tr v-for="relation in record.dishProductRelations" :key="relation.product.id">
							<td>{{ relation.product.i18n[$i18n.locale].title }}</td>
							<td class="text-right">{{ relation.grams }}&nbsp{{ t('products.grams') }}</td>
						</tr>
					</tbody>
				</v-table>

				<div class="break-spaces mt-6">{{ record.descriptionFull }}</div>
			</v-responsive>
		</template>
	</loader>
</template>

<script setup lang="ts">
	import Loader from '@/components/loaders/Loader.vue';
	import DishService from '@/services/dish';
	import Dish from '@/models/dish';
	import { useI18n } from 'vue-i18n';
	import { computed, Ref, ref } from 'vue';

	type Properties = {
		id: number;
	}

	const service = new DishService();
	const properties = defineProps<Properties>();
	const { t } = useI18n();

	const record: Ref<Dish | null> = ref(null);
	const nutritionValue = computed(() => record.value == null ? null : DishService.getNutritionValue(record.value));

	const onLoad = (value: Dish) => {
		record.value = value;
	}
</script>