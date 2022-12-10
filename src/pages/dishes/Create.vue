<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<v-container>
			<v-form>
				<h2 class="text-center mb-6">{{ t('dishes.create.title') }}</h2>
				<v-text-field v-model="dish.title" :label="t('dishes.create.form.title')" variant="solo"></v-text-field>
				<v-file-input :label="t('dishes.create.form.image')"
							  accept="image/png,image/jpeg,image/bmp"
							  prepend-icon="mdi-camera"
							  variant="solo"
							  outlined
							  dense>
				</v-file-input>

				<product-selector :label="t('dishes.create.form.product.label')" @selected="onProductSelected"></product-selector>

				<v-row>
					<v-col v-for="relation in dish.dishProductRelations" cols="12" sm="6" class="grow">
						<v-card class="fill-height">
							<v-card-text class="d-flex flex-column fill-height">
								<span class="text-subtitle-2">{{ relation.product.i18n[$i18n.locale].title }}</span>
								<v-card-subtitle class="pl-0">Fuck</v-card-subtitle>
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
			</v-form>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import ProductSelector from '@/components/forms/controls/ProductSelector.vue';
	import { useI18n } from 'vue-i18n';
	import { reactive } from 'vue';
	import Product from '@/models/product';
	import Dish from '@/models/dish';
	import DishSerializer from '@/serializers/dish';

	const dish = reactive<Dish>({ title: '', image: '', dishProductRelations: [] });

	const { t } = useI18n();

	const onProductSelected = (value: Product) => {
		dish.dishProductRelations.push({ product: value, grams: 0 });

		console.log(new DishSerializer().serialize(dish));
	}
</script>