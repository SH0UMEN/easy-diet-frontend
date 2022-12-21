<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<v-container>
			<h2 class="text-center mb-6">{{ t('dishes.create.title') }}</h2>
			<dish-form v-model:dish="dish"></dish-form>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import DishForm from '@/components/forms/DishForm.vue';
	import { reactive } from 'vue';
	import { useI18n } from 'vue-i18n';
	import Dish from '@/models/dish';

	const { t } = useI18n();

	const dish = reactive<Dish>({ title: '', descriptionShort: '', descriptionFull: '', image: null, dishProductRelations: [] });
</script>