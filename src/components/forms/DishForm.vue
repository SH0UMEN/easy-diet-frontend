<template>
	<v-form v-model="valid">
		<v-row>
			<v-col cols="12" sm="6" class="mb-n6 mb-sm-0">
				<v-text-field v-model="dish.title"
							  :rules="titleRules"
							  :label="t('dishes.form.title')"
							  ref="title"
							  variant="solo"
							  class="mb-2">
				</v-text-field>
				<thumbnail-picker :label="t('dishes.form.image')"
								  :image-rules="imageRules"
								  v-model="dish.image">
				</thumbnail-picker>
			</v-col>

			<v-col cols="12" sm="6">
				<ai-textarea :rules="descriptionShortRules"
							 :generator="generateDescriptionShort"
							 :label="t('dishes.form.description.short')"
							 v-model="dish.descriptionShort"
							 :ai-available="aiAvailable"
							 ref="descriptionShort"
							 variant="solo"
							 class="mb-2">
				</ai-textarea>

				<ai-textarea :rules="descriptionFullRules"
							 :generator="generateDescriptionFull"
							 :label="t('dishes.form.description.full')"
							 v-model="dish.descriptionFull"
							 :ai-available="aiAvailable"
							 ref="descriptionFull"
							 variant="solo"
							 class="mb-2">
				</ai-textarea>

				<ingredient-selector :title-property="'i18n.' + $i18n.locale + '.title'"
									 :label="t('dishes.form.product.label')"
									 @selected="onProductSelected"
									 :excluded="productIds"
									 :service="service"
									 class="mb-2">
					<template #default="{ record, props }: { record: Product }">
						<v-list-item v-bind="props">
							<v-list-item-subtitle>
								<span class="mr-5">{{ t('products.kcal') }}: {{ record.kcal }}</span>
								<span class="mr-5">{{ t('products.protein') }}: {{ record.protein }}</span>
								<span class="mr-5">{{ t('products.fat') }}: {{ record.fat }}</span>
								<span>{{ t('products.carbohydrate') }}: {{ record.carbohydrate }}</span>
							</v-list-item-subtitle>
						</v-list-item>
					</template>
				</ingredient-selector>

				<v-row>
					<v-col v-for="(product, i) in dish.dishProductRelations" cols="12" sm="6" class="grow mb-2">
						<product-card :product="product" editable>
							<template #actions>
								<v-card-actions class="justify-end">
									<v-btn @click="remove(i as number)" color="red-accent-2" variant="text">{{ t('dishes.form.product.remove') }}</v-btn>
								</v-card-actions>
							</template>
						</product-card>
					</v-col>
				</v-row>

				<v-btn :disabled="!valid || dish.dishProductRelations.length == 0 || loading"
					   :loading="loading"
					   type="submit"
					   class="mt-6"
					   color="yellow-accent-3"
					   block>
					{{ submitText }}
				</v-btn>

				<div v-if="errors.length > 0">
					<v-alert v-for="error in errors" class="mt-6" type="error">{{ error }}</v-alert>
				</div>
			</v-col>
		</v-row>
	</v-form>
</template>

<script setup lang="ts">
	import IngredientSelector from '@/components/controls/IngredientSelector.vue';
	import ThumbnailPicker from '@/components/controls/ThumbnailPicker.vue';
	import ProductCard from '@/components/cards/ProductCard.vue';
	import AiTextarea from '@/components/controls/AiTextarea.vue';
	import {
		computed,
		defineProps,
		reactive,
		ref,
		toRefs,
	} from 'vue';
	import { useI18n } from 'vue-i18n';
	import ValidationService from '@/services/validation';
	import ProductService from '@/services/product';
	import DishService from '@/services/dish';
	import Product from '@/models/product';
	import Dish from '@/models/dish';

	type Properties = {
		errors: Array<string>;
		submitText: string;
		loading: boolean;
		dish: Dish;
	}

	const service = new ProductService();

	const properties = withDefaults(defineProps<Properties>(), { loading: false, submitText: '', errors: () => [] });
	const { t } = useI18n();

	const title = ref<any>(null);
	const descriptionShort = ref<any>(null);
	const descriptionFull = ref<any>(null);
	const valid = ref(false);

	const { dish } = toRefs(properties);

	const titleRules = reactive([ValidationService.required(t), ValidationService.lessThanOrEqualTo(t, 30)]);
	const descriptionShortRules = reactive([ValidationService.lessThanOrEqualTo(t, 300)]);
	const descriptionFullRules = reactive([ValidationService.lessThanOrEqualTo(t, 2000)]);
	const imageRules = computed(() => dish.value.id == null ? [ValidationService.requiredFile(t)] : []);
	const aiAvailable = computed(() => dish.value.title != '' && dish.value.dishProductRelations.length > 0);
	const productIds = computed(() => {
		const ids = [];

		for(let relation of dish.value.dishProductRelations)
			if(relation.product.id != null)
				ids.push(relation.product.id);

		return ids;
	});

	const generateDescriptionShort = (handler: Function) => {
		DishService.generateDescriptionShort(dish.value.title, productIds.value, handler);
	};

	const generateDescriptionFull = (handler: Function) => {
		DishService.generateDescriptionFull(dish.value.title, productIds.value, handler);
	};

	const onProductSelected = (value: Product) => {
		dish.value.dishProductRelations.push({ product: value, grams: 0 });
	};

	const remove = (index: number) => {
		dish.value.dishProductRelations.splice(index, 1);
	};
</script>