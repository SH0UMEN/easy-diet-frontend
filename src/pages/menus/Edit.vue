<template>
	<menu-editor :id="id" :title="t('menus.edit.title')" :submit-text="t('menus.edit.submit')"></menu-editor>
</template>

<script setup lang="ts">
	import MenuEditor from '@/components/editors/MenuEditor.vue';
	import { useI18n } from 'vue-i18n';
	import { toRefs } from 'vue';

	type Properties = {
		id: number;
	};

	const properties = defineProps<Properties>();
	const { t } = useI18n();

	const { id } = toRefs(properties);
</script>