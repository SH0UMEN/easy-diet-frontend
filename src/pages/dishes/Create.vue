<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<v-container>
			<h2 class="text-center mb-6">{{ t('dishes.create.title') }}</h2>
			<dish-form @submit.prevent="onSubmit"
					   :submit-text="t('dishes.create.form.submit')"
					   v-model:dish="dish"
					   :loading="loading"
					   :errors="errors">
			</dish-form>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import DishForm from '@/components/forms/DishForm.vue';
	import { reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import DishService from '@/services/dish';
	import Dish from '@/models/dish';
	import router from '@/router';

	const { t } = useI18n();

	const loading = ref(false);

	const dish = reactive<Dish>({ title: '', descriptionShort: '', descriptionFull: '', image: null, dishProductRelations: [] });
	const errors = reactive<Array<string>>([]);

	const onSubmit = async () => {
		errors.splice(0, errors.length);
		loading.value = true;

		try {
			await new DishService().create(dish);
			router.push({ name: 'dishes-mine' });
		} catch(e) {
			errors.push(t('errors.unknown'));
		}

		loading.value = false;
	};
</script>