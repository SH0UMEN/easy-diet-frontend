<template>
	<v-form v-model="valid">
		<v-text-field v-model="dish.title" :rules="titleRules" :label="t('dishes.form.title')" variant="solo" class="mb-2"></v-text-field>
		<v-textarea v-model="dish.descriptionShort"
					:rules="descriptionShortRules"
					ref="descriptionShort"
					:label="t('dishes.form.description.short')"
					variant="solo"
					class="mb-2">
		</v-textarea>
		<v-textarea v-model="dish.descriptionFull"
					:rules="descriptionFullRules"
					ref="descriptionFull"
					:label="t('dishes.form.description.full')"
					variant="solo"
					class="mb-2">
		</v-textarea>
		<v-file-input :label="t('dishes.form.image')"
					  @update:modelValue="onImageSelected"
					  :rules="imageRules"
					  accept="image/png,image/jpeg,image/bmp"
					  prepend-icon="mdi-camera"
					  variant="solo"
					  class="mb-2"
					  outlined
					  dense>
		</v-file-input>
		<product-selector :label="t('dishes.form.product.label')" @selected="onProductSelected" class="mb-2"></product-selector>

		<v-row>
			<v-col v-for="(product, i) in dish.dishProductRelations" cols="12" sm="6" class="grow mb-2">
				<product-card :product="product">
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
	</v-form>
</template>

<script setup lang="ts">
	import ProductSelector from '@/components/controls/ProductSelector.vue';
	import ProductCard from '@/components/cards/ProductCard.vue';
	import { computed, defineProps, onMounted, reactive, Ref, ref, toRefs, watch } from 'vue';
	import { useI18n } from 'vue-i18n';
	import ValidationService from '@/services/validation';
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

	const descriptionShort = ref<any>(null);
	const descriptionFull = ref<any>(null);
	const valid = ref(false);

	const { dish, errors, loading, submitText } = toRefs(properties);

	const titleRules = reactive([ValidationService.required(t), ValidationService.lessThanOrEqualTo(t, 30)]);
	const descriptionShortRules = reactive([ValidationService.lessThanOrEqualTo(t, 300)]);
	const descriptionFullRules = reactive([ValidationService.lessThanOrEqualTo(t, 2000)]);
	const imageRules = computed(() => dish.value.id == null ? [ValidationService.requiredFile(t)] : []);

	const onProductSelected = (value: Product) => {
		dish.value.dishProductRelations.push({ product: value, grams: 0 });
	};

	const onImageSelected = (value: Array<File>) => {
		dish.value.image = value[0];
	};

	const remove = (index: number) => {
		dish.value.dishProductRelations.splice(index, 1);
	};

	const handleImageUrl = () => {
		if(typeof dish.value.image == 'string')
			dish.value.image = undefined;
	};

	watch(dish, handleImageUrl, { immediate: true, deep: true });

	onMounted(() => {
		descriptionShort.value.validate();
		descriptionFull.value.validate();
	});
</script>