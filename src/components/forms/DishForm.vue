<template>
	<v-form v-model="valid">
		<v-row>
			<v-col>
				<v-text-field v-model="dish.title"
							  :rules="titleRules"
							  :label="t('dishes.form.title')"
							  ref="title"
							  variant="solo"
							  class="mb-2">
				</v-text-field>
				<thumbnail-picker :label="t('dishes.form.image')"
								  :ai-available="aiAvailable"
								  :generator="generateImage"
								  :image-rules="imageRules"
								  v-model="dish.image">
				</thumbnail-picker>
			</v-col>

			<v-col>
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

				<product-selector :label="t('dishes.form.product.label')" @selected="onProductSelected" class="mb-2"></product-selector>

				<v-row>
					<v-col v-for="(product, i) in dish.dishProductRelations" cols="12" sm="6" class="grow mb-2">
						<product-card :product="product" editable>
							<template #actions>
								<v-card-actions class="justify-end">
									<v-btn @click="remove(i)" color="red-accent-2" variant="text">{{ t('dishes.form.product.remove') }}</v-btn>
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
	import ProductSelector from '@/components/controls/ProductSelector.vue';
	import ThumbnailPicker from '@/components/controls/ThumbnailPicker.vue';
	import ProductCard from '@/components/cards/ProductCard.vue';
	import AiTextarea from '@/components/controls/AiTextarea.vue';
	import {
		computed,
		defineProps,
		onMounted,
		reactive,
		ref,
		toRefs,
	} from 'vue';
	import { useI18n } from 'vue-i18n';
	import ValidationService from '@/services/validation';
	import DishService from '@/services/dish';
	import Product from '@/models/product';
	import Dish from '@/models/dish';

	type Properties = {
		errors: Array<string>;
		submitText: string;
		loading: boolean;
		dish: Dish;
	}

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

	onMounted(() => {
		title.value.validate();
		descriptionShort.value.validate();
		descriptionFull.value.validate();
	});
</script>