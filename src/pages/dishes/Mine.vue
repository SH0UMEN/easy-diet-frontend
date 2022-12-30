<template>
	<dish-finder :title="t('dishes.mine.title')" :no-data="t('dishes.mine.noData')" route="dishes-edit" :parameters="parameters">
		<template #actions="{ id, deleteById }">
			<v-card-actions class="justify-end">
				<action-button :button-properties="{ color: 'red-accent-2', variant: 'text' }"
							   :action="async () => await deleteById(id)">
					{{ t('dishes.mine.delete') }}
				</action-button>
			</v-card-actions>
		</template>
	</dish-finder>
</template>

<script setup lang="ts">
	import DishFinder from '@/components/finders/DishFinder.vue';
	import ActionButton from '@/components/buttons/ActionButton.vue';
	import { useI18n } from 'vue-i18n';
	import { toRefs } from 'vue';
	import CRUDGetParameters from '@/types/CRUDGetParameters';
	import useStore from '@/store/auth';

	const { user } = toRefs(useStore());
	const { t } = useI18n();

	const parameters: CRUDGetParameters = { author: user.value?.id };
</script>