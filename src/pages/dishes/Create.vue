<template>
	<dish-editor :title="t('dishes.create.title')" :submit-text="t('dishes.create.submit')"></dish-editor>
</template>

<script setup lang="ts">
	import DishEditor from '@/components/editors/DishEditor.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>