<template>
	<loader :id="id" :service="service" @load="onLoad">
		<template #form v-if="record != null">
			<h2 class="text-center mb-6">{{ record.title }}</h2>

			<v-responsive max-width="768" class="mx-auto">
				<v-img :src="record.image as string" class="pb-3"></v-img>

				<rating :readonly="user == null || user.id == record.author?.id"
						:overall-score="record.overallScore"
						:scores-count="record.scoresCount"
						:model-value="record.userScore"
						@update:modelValue="onScoreChanged"
						class="mt-2">
				</rating>

				<v-table v-if="nutritionValue != null" density="compact" class="mt-6">
					<thead>
						<tr>
							<th colspan="2">{{ t('nutritionValue.value') + ' (' + t('nutritionValue.relative') + ')' }}</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{{ t('nutritionValue.kcal') }}</td>
							<td class="text-right">{{ Math.round(nutritionValue.kcal) }}&nbsp{{ t('products.kcal') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.protein') }}</td>
							<td class="text-right">{{ nutritionValue.protein.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.fat') }}</td>
							<td class="text-right">{{ nutritionValue.fat.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.carbohydrate') }}</td>
							<td class="text-right">{{ nutritionValue.carbohydrate.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
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
	import useStore from '@/store/auth';
	import Dish from '@/models/dish';
	import { computed, Ref, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';
	import Rating from '@/components/controls/Rating.vue';

	type Properties = {
		id: number;
	}

	const service = new DishService();
	const properties = defineProps<Properties>();
	const { t } = useI18n();

	const { user } = storeToRefs(useStore());
	const record: Ref<Dish | null> = ref(null);
	const nutritionValue = computed(() => record.value == null ? null : DishService.getNutritionValue(record.value));

	const onLoad = (value: Dish) => {
		record.value = value;
	}

	const onScoreChanged = async (value: number) => {
		if(record.value == null)
			return;

		record.value.userScore = value;
		record.value = await service.rate(record.value, value);
	}
</script>