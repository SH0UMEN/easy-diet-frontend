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
							<th>{{ t('nutritionValue.value') }}</th>
							<th class="text-right">{{ t('nutritionValue.full') }}</th>
							<th class="text-right">{{ t('nutritionValue.relative') }}</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{{ t('nutritionValue.kcal') }}</td>
							<td class="text-right">{{ Math.round(nutritionValue.kcalFull) }}&nbsp{{ t('products.kcal') }}</td>
							<td class="text-right">{{ Math.round(nutritionValue.kcal) }}&nbsp{{ t('products.kcal') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.protein') }}</td>
							<td class="text-right">{{ nutritionValue.proteinFull.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
							<td class="text-right">{{ nutritionValue.protein.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.fat') }}</td>
							<td class="text-right">{{ nutritionValue.fatFull.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
							<td class="text-right">{{ nutritionValue.fat.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
						</tr>

						<tr>
							<td>{{ t('nutritionValue.carbohydrate') }}</td>
							<td class="text-right">{{ nutritionValue.carbohydrateFull.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
							<td class="text-right">{{ nutritionValue.carbohydrate.toFixed(2) }}&nbsp{{ t('products.grams') }}</td>
						</tr>
					</tbody>
				</v-table>

				<v-list class="mt-6">
					<v-list-subheader>{{ t('menus.view.ingredients') }}</v-list-subheader>

					<v-list-item :to="{ name: 'dishes-page', params: { id: relation.dish.id } }"
								 v-for="relation in record.menuDishRelations"
								 :key="relation.dish.id">
						<template #prepend>
							<span>{{ relation.quantity }}</span>
							<span class="mx-3">&#10005;</span>
							<v-avatar v-if="isString(relation.dish.image)" :image="relation.dish.image"></v-avatar>
						</template>

						<v-list-item-title v-text="relation.dish.title"></v-list-item-title>
					</v-list-item>
				</v-list>

				<div class="break-spaces mt-6">{{ record.descriptionFull }}</div>
			</v-responsive>
		</template>
	</loader>
</template>

<script setup lang="ts">
	import Loader from '@/components/loaders/Loader.vue';
	import { useI18n } from 'vue-i18n';
	import { computed, Ref, ref } from 'vue';
	import MenuService from '@/services/menu';
	import Menu from '@/models/menu';
	import DishCard from '@/components/cards/DishCard.vue';
	import { isString } from '@/utils';
	import Rating from '@/components/controls/Rating.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '@/store/auth';
	import Dish from '@/models/dish';
	import DishService from '@/services/dish';

	type Properties = {
		id: number;
	}

	const service = new MenuService();
	const properties = defineProps<Properties>();
	const { t } = useI18n();

	const { user } = storeToRefs(useStore());

	const record: Ref<Menu | null> = ref(null);
	const nutritionValue = computed(() => record.value == null ? null : MenuService.getNutritionValue(record.value));

	const onLoad = (value: Menu) => {
		record.value = value;
	}

	const onScoreChanged = async (value: number) => {
		if(record.value == null)
			return;

		record.value.userScore = value;
		record.value = await service.rate(record.value, value);
	}
</script>