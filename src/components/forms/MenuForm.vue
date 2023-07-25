<template>
	<v-form v-model="valid">
		<v-row>
			<v-col>
				<v-text-field v-model="menu.title"
							  :rules="titleRules"
							  :label="t('menus.form.title')"
							  ref="title"
							  variant="solo"
							  class="mb-2">
				</v-text-field>
				<thumbnail-picker :label="t('menus.form.image')"
								  :image-rules="imageRules"
								  v-model="menu.image">
				</thumbnail-picker>
			</v-col>

			<v-col>
				<ai-textarea :rules="descriptionShortRules"
							 :generator="generateDescriptionShort"
							 :label="t('menus.form.description.short')"
							 v-model="menu.descriptionShort"
							 :ai-available="aiAvailable"
							 ref="descriptionShort"
							 variant="solo"
							 class="mb-2">
				</ai-textarea>

				<ai-textarea :rules="descriptionFullRules"
							 :generator="generateDescriptionFull"
							 :label="t('menus.form.description.full')"
							 v-model="menu.descriptionFull"
							 :ai-available="aiAvailable"
							 ref="descriptionFull"
							 variant="solo"
							 class="mb-2">
				</ai-textarea>

				<ingredient-selector :label="t('menus.form.product.label')"
									 :excluded="dishesIds"
									 @selected="onDishSelected"
									 title-property="title"
									 :service="service"
									 class="mb-2">
					<template #default="{ record, props }: { record: Dish }">
						<v-list-item v-bind="props">
							<template #prepend>
								<v-avatar v-if="isString(record.image)" :image="record.image"></v-avatar>
							</template>

							<v-list-item-subtitle>
								<dish-preview :dish="record"></dish-preview>
							</v-list-item-subtitle>
						</v-list-item>
					</template>
				</ingredient-selector>

				<v-row>
					<v-col v-for="(relation, i) in menu.menuDishRelations" cols="12" sm="6" class="grow mb-2">
						<dish-card :dish="relation.dish" editable>
							<template #actions>
								<v-text-field v-model.number="relation.quantity"
											  :rules="quantityRules"
											  variant="outlined"
											  class="mt-2 mx-4"
											  density="compact"
											  type="number">
								</v-text-field>

								<v-card-actions class="justify-end">
									<v-btn @click="remove(i)" color="red-accent-2" variant="text">{{ t('dishes.form.product.remove') }}</v-btn>
								</v-card-actions>
							</template>
						</dish-card>
					</v-col>
				</v-row>

				<v-btn :disabled="!valid || menu.menuDishRelations.length == 0 || loading"
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
	import ThumbnailPicker from '@/components/controls/ThumbnailPicker.vue';
	import DishPreview from '@/components/preview/DishPreview.vue';
	import DishCard from '@/components/cards/DishCard.vue';
	import {
		computed,
		defineProps,
		reactive,
		ref,
		toRefs,
	} from 'vue';
	import { useI18n } from 'vue-i18n';
	import IngredientSelector from '@/components/controls/IngredientSelector.vue';
	import AiTextarea from '@/components/controls/AiTextarea.vue';
	import ValidationService from '@/services/validation';
	import DishService from '@/services/dish';
	import MenuService from '@/services/menu';
	import Dish from '@/models/dish';
	import Menu from '@/models/menu';
	import { isString } from '@/utils';

	type Properties = {
		errors: Array<string>;
		submitText: string;
		loading: boolean;
		menu: Menu;
	}

	const service = new DishService();

	const properties = withDefaults(defineProps<Properties>(), { loading: false, submitText: '', errors: () => [] });
	const { t } = useI18n();

	const descriptionShort = ref<any>(null);
	const descriptionFull = ref<any>(null);
	const title = ref<any>(null);
	const valid = ref(false);

	const { menu } = toRefs(properties);

	const titleRules = reactive([ValidationService.required(t), ValidationService.lessThanOrEqualTo(t, 30)]);
	const descriptionShortRules = reactive([ValidationService.lessThanOrEqualTo(t, 300)]);
	const descriptionFullRules = reactive([ValidationService.lessThanOrEqualTo(t, 2000)]);
	const quantityRules = reactive([ValidationService.required(t), ValidationService.moreThanOrEqualTo(t, 1)]);
	const aiAvailable = computed(() => menu.value.title != '' && menu.value.menuDishRelations.length > 0);
	const imageRules = computed(() => menu.value.id == null ? [ValidationService.requiredFile(t)] : []);
	const dishesIds = computed(() => {
		const ids = [];

		for(let relation of menu.value.menuDishRelations)
			if(relation.dish.id != null)
				ids.push(relation.dish.id);

		return ids;
	});

	const generateDescriptionShort = (handler: Function) => {
		MenuService.generateDescriptionShort(menu.value.title, dishesIds.value, handler);
	};

	const generateDescriptionFull = (handler: Function) => {
		MenuService.generateDescriptionFull(menu.value.title, dishesIds.value, handler);
	};

	const onDishSelected = (value: Dish) => {
		menu.value.menuDishRelations.push({ dish: value, quantity: 1 });
	};

	const remove = (index: number) => {
		menu.value.menuDishRelations.splice(index, 1);
	};
</script>