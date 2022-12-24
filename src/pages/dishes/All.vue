<template>
	<dish-finder>
		<template #title>{{ t('dishes.all.title') }}</template>

		<template #no-data>
			<span class="text-h6 mb-4">{{ t('dishes.all.noData') }}</span>
			<v-btn :to="{ name: 'dishes-create' }" color="yellow-accent-3">{{ t('dishes.create.floating') }}</v-btn>
		</template>
	</dish-finder>
</template>

<script setup lang="ts">
	import DishFinder from '@/components/finders/DishFinder.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>