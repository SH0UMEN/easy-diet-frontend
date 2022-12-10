<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<v-container>
			<v-form>
				<h2 class="text-center mb-6">{{ t('dishes.create.title') }}</h2>
				<v-text-field :label="t('dishes.create.form.title')" variant="solo"></v-text-field>
				<v-file-input :label="t('dishes.create.form.image')"
							  accept="image/png,image/jpeg,image/bmp"
							  prepend-icon="mdi-camera"
							  variant="solo"
							  outlined
							  dense>
				</v-file-input>
			</v-form>

			<product-selector :label="t('dishes.create.form.product.label')" @selected="onProductSelected"></product-selector>

			<v-row>
				<v-col v-for="product in products" cols="12" sm="6" class="grow">
					<v-card class="fill-height">
						<v-card-text class="d-flex flex-column fill-height">
							<span class="text-subtitle-2">{{ product.i18n[$i18n.locale].title }}</span>
							<v-card-subtitle class="pl-0">Fuck</v-card-subtitle>
							<v-spacer></v-spacer>

							<v-text-field :hide-details="true"
										  type="number"
										  variant="outlined"
										  class="flex-grow-0 mt-2"
										  density="compact">
							</v-text-field>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import ProductSelector from '@/components/forms/controls/ProductSelector.vue';
	import { useI18n } from 'vue-i18n';
	import { reactive } from 'vue';
	import Product from '@/models/product';

	const products = reactive<Array<Product>>([]);

	const { t } = useI18n();

	const onProductSelected = (value: Product) => {
		products.push(value);
	}
</script>