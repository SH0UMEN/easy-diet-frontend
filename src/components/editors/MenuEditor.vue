<template>
	<editor :service="service" :id="id" @saved="onSave" :title="title">
		<template #form="{ record, loading, errors, submit }: { record: Menu }">
			<menu-form @submit.prevent="submit"
					   :submit-text="submitText"
					   :loading="loading"
					   :errors="errors"
					   :menu="record">
			</menu-form>
		</template>
	</editor>
</template>

<script setup lang="ts">
	import MenuForm from '@/components/forms/MenuForm.vue';
	import Editor from '@/components/editors/Editor.vue';
	import { useI18n } from 'vue-i18n';
	import MenuService from '@/services/menu';
	import router from '@/router';
	import { toRefs } from 'vue';
	import Menu from '@/models/menu';

	type Properties = {
		submitText: string;
		title: string;
		id?: number;
	}

	const properties = defineProps<Properties>();
	const { title, id } = toRefs(properties);

	const service = new MenuService();
	const { t } = useI18n();

	const onSave = () => {
		router.push({ name: 'menus-mine' });
	};
</script>