<template>
	<dish-finder :parameters="parameters">
		<template #title>{{ t('dishes.mine.title') }}</template>

		<template #no-data>
			<span class="text-h6 mb-4">{{ t('dishes.mine.noData') }}</span>
			<v-btn :to="{ name: 'dishes-create' }" color="yellow-accent-3">{{ t('dishes.create.floating') }}</v-btn>
		</template>

		<template #actions>
			<v-card-actions class="justify-end">
				<v-btn color="red-accent-2" variant="text">{{ t('dishes.mine.delete') }}</v-btn>
			</v-card-actions>
		</template>
	</dish-finder>
</template>

<script setup lang="ts">
	import DishFinder from '@/components/finders/DishFinder.vue';
	import { useI18n } from 'vue-i18n';
	import CRUDGetParameters from '@/types/CRUDGetParameters';
	import useStore from '@/store/auth';
	import { toRefs } from 'vue';

	const { t } = useI18n();
	const { user } = toRefs(useStore());

	const parameters: CRUDGetParameters = { author: user.value?.id };
</script>