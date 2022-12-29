<template>
	<dish-finder :title="t('dishes.all.title')" :no-data="t('dishes.all.noData')"></dish-finder>
</template>

<script setup lang="ts">
	import DishFinder from '@/components/finders/DishFinder.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>