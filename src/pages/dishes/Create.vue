<template>
	<v-responsive max-width="768" class="mx-auto px-2 pt-4 pt-sm-12">
		<dish-editor :title="t('dishes.create.title')"></dish-editor>
	</v-responsive>
</template>

<script setup lang="ts">
	import DishEditor from '@/components/editors/DishEditor.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>