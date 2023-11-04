<template>
	<menu-finder :title="t('menus.mine.title')" route="menus-edit" :no-data="t('menus.mine.noData')">
		<template #actions="{ id, deleteById }">
			<v-card-actions class="justify-end">
				<action-button :button-properties="{ color: 'red-accent-2', variant: 'text' }"
							   :action="async () => await deleteById(id)">
					{{ t('menus.mine.delete') }}
				</action-button>
			</v-card-actions>
		</template>
	</menu-finder>
</template>

<script setup lang="ts">
	import MenuFinder from '@/components/finders/MenuFinder.vue';
	import ActionButton from '@/components/buttons/ActionButton.vue';
  import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>