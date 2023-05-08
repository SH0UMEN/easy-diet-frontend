<template>
	<dish-editor :id="id" :title="t('dishes.edit.title')" :submit-text="t('dishes.edit.submit')"></dish-editor>
</template>

<script setup lang="ts">
	import DishEditor from '@/components/editors/DishEditor.vue';
	import { useI18n } from 'vue-i18n';
	import { toRefs } from 'vue';

	type Properties = {
		id: number;
	};

	const properties = defineProps<Properties>();
	const { t } = useI18n();

	const { id } = toRefs(properties);
</script>