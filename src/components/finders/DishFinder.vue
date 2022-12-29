<template>
	<finder :service="service" :parameters="parameters" :no-data="noData" :title="title" :create-text="t('dishes.floating')" create-url="dishes-create">
		<template #list="{ records }">
			<v-col v-for="dish in records" cols="12" sm="6" md="4" xl="3">
				<dish-card :to="{ name: route, params: { id: dish.id } }" :dish="dish" class="fill-height">
					<template #actions>
						<slot name="actions"></slot>
					</template>
				</dish-card>
			</v-col>
		</template>
	</finder>
</template>

<script setup lang="ts">
	import Finder from '@/components/finders/Finder.vue';
	import DishCard from '@/components/cards/DishCard.vue';
	import DishService from '@/services/dish';
	import CRUDGetParameters from '@/types/CRUDGetParameters';
	import { defineProps } from 'vue';
	import { useI18n } from 'vue-i18n';

	type Properties = {
		parameters?: CRUDGetParameters;
		noData: string;
		route?: string;
		title: string;
	}

	withDefaults(defineProps<Properties>(), { parameters: () => ({}) });

	const service = new DishService();

	const { t } = useI18n();
</script>