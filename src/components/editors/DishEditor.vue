<template>
	<editor :service="service" :id="id" @saved="onSave" :title="title">
		<template #form="{ record, loading, errors, submit }:
						{ record: Dish, loading: boolean, errors: Array<string>, submit: Function }">
			<dish-form @submit.prevent="submit"
					   :submit-text="submitText"
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
	import { toRefs } from 'vue';
	import Dish from '@/models/dish';

	type Properties = {
		submitText: string;
		title: string;
		id?: number;
	}

	const properties = defineProps<Properties>();
	const { title, id } = toRefs(properties);

	const service = new DishService();
	const { t } = useI18n();

	const onSave = () => {
		router.push({ name: 'dishes-mine' });
	};
</script>