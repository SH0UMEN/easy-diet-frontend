<template>
	<finder :service="service" :parameters="parameters" :no-data="noData" :title="title" :create-text="t('menus.floating')" create-url="menus-create">
		<template #list="{ records, deleteById }: { records: Array<Menu>, deleteById: Function }">
			<v-col v-for="menu in records" cols="12" sm="6" md="4" xl="3">
				<menu-card :to="{ name: route, params: { id: menu.id } }" :menu="menu" class="fill-height">
					<template #actions>
						<slot name="actions" :id="menu.id" :delete-by-id="deleteById"></slot>
					</template>
				</menu-card>
			</v-col>
		</template>
	</finder>
</template>

<script setup lang="ts">
	import Finder from '@/components/finders/Finder.vue';
	import MenuCard from '@/components/cards/MenuCard.vue';
	import CRUDGetParameters from '@/types/requests/CRUDGetParameters';
	import MenuService from '@/services/menu';
	import { defineProps } from 'vue';
	import { useI18n } from 'vue-i18n';
	import Menu from '@/models/menu';

	type Properties = {
		parameters?: CRUDGetParameters;
		noData: string;
		route?: string;
		title: string;
	}

	withDefaults(defineProps<Properties>(), { parameters: () => ({}) });

	const service = new MenuService();

	const { t } = useI18n();
</script>