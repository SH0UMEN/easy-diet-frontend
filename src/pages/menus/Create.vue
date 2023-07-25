<template>
	<menu-editor :title="t('menus.create.title')" :submit-text="t('menus.create.submit')"></menu-editor>
</template>

<script setup lang="ts">
	import MenuEditor from '@/components/editors/MenuEditor.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>