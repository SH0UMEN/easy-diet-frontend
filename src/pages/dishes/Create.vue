<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<v-container>
			<v-form @submit.prevent="onSubmit" v-model="valid">
				<h2 class="text-center mb-6">{{ t('dishes.create.title') }}</h2>
				<v-text-field v-model="dish.title" :rules="titleRules" :label="t('dishes.create.form.title')" variant="solo" class="mb-2"></v-text-field>
				<v-file-input :label="t('dishes.create.form.image')"
							  @update:modelValue="onImageSelected"
							  :rules="imageRules"
							  accept="image/png,image/jpeg,image/bmp"
							  prepend-icon="mdi-camera"
							  variant="solo"
							  class="mb-2"
							  outlined
							  dense>
				</v-file-input>

				<product-selector :label="t('dishes.create.form.product.label')" @selected="onProductSelected" class="mb-2"></product-selector>

				<v-row>
					<v-col v-for="relation in dish.dishProductRelations" cols="12" sm="6" class="grow mb-2">
						<v-card class="fill-height">
							<v-card-text class="d-flex flex-column fill-height">
								<span class="text-subtitle-2">{{ relation.product.i18n[$i18n.locale].title }}</span>
								<v-card-subtitle class="pl-0">
									<span class="mr-5">{{ t('products.kcal') }}: {{ relation.product.kcal }}</span>
									<span class="mr-5">{{ t('products.protein') }}: {{ relation.product.protein }}</span>
									<span class="mr-5">{{ t('products.fat') }}: {{ relation.product.fat }}</span>
									<span>{{ t('products.carbohydrate') }}: {{ relation.product.carbohydrate }}</span>
								</v-card-subtitle>
								<v-spacer></v-spacer>

								<v-text-field :hide-details="true"
											  v-model.number="relation.grams"
											  type="number"
											  variant="outlined"
											  class="flex-grow-0 mt-2"
											  density="compact">
								</v-text-field>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<v-btn :disabled="!valid || dish.dishProductRelations.length == 0 || loading"
					   :loading="loading"
					   type="submit"
					   class="mt-6"
					   color="yellow-accent-3"
					   block>
					{{ t('dishes.create.form.submit') }}
				</v-btn>

				<v-alert class="mt-6" v-if="error != null" type="error">{{ error }}</v-alert>
			</v-form>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import ProductSelector from '@/components/forms/controls/ProductSelector.vue';
	import { useI18n } from 'vue-i18n';
	import { reactive, ref } from 'vue';
	import ValidationService from '@/services/validation';
	import DishService from '@/services/dish';
	import Product from '@/models/product';
	import Dish from '@/models/dish';
	import router from '@/router';

	const { t } = useI18n();

	const dish = reactive<Dish>({ title: '', image: null, dishProductRelations: [] });
	const titleRules = reactive([ValidationService.required(t)]);
	const imageRules = reactive([ValidationService.requiredFile(t)]);

	const valid = ref(false);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const onProductSelected = (value: Product) => {
		dish.dishProductRelations.push({ product: value, grams: 0 });
	};

	const onImageSelected = (value: Array<File>) => {
		dish.image = value[0];
	};

	const onSubmit = async () => {
		loading.value = true;

		try {
			await new DishService().create(dish);
			router.push({ name: 'dishes-mine' });
		} catch(e) {
			error.value = 'Неизвестная ошибка';
		}

		loading.value = false;
	};
</script>