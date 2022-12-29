<template>
	<v-responsive max-width="768" class="fill-height mx-auto px-2 pt-4 pt-sm-12">
		<dish-editor :id="id" :title="t('dishes.edit.title')"></dish-editor>
	</v-responsive>
</template>

<script setup lang="ts">
	import DishEditor from '@/components/editors/DishEditor.vue';
	import { useI18n } from 'vue-i18n';

	type Properties = {
		id: number;
	};

	defineProps<Properties>();
	const { t } = useI18n();
</script>