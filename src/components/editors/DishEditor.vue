<template>
	<editor :service="service" :id="id" @saved="onSave" :title="title">
		<template #form="{ record, loading, errors, submit }">
			<dish-form @submit.prevent="submit"
					   :submit-text="t('dishes.form.submit')"
					   :loading="loading"
					   :errors="errors"
					   :dish="record">
			</dish-form>
		</template>
	</editor>
</template>

<script setup lang="ts">
	import DishForm from '@/components/forms/DishForm.vue';
	import Editor from '@/components/editors/Editor.vue';
	import { useI18n } from 'vue-i18n';
	import DishService from '@/services/dish';
	import router from '@/router';

	type Properties = {
		title: string;
		id?: number;
	}

	const properties = defineProps<Properties>();

	const service = new DishService();
	const { t } = useI18n();

	const onSave = () => {
		router.push({ name: 'dishes-mine' });
	};
</script>