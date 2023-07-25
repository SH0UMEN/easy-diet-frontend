<template>
	<menu-finder :title="t('menus.all.title')" route="menus-page" :no-data="t('menus.all.noData')"></menu-finder>
</template>

<script setup lang="ts">
	import MenuFinder from '@/components/finders/MenuFinder.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>