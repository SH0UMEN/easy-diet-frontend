<template>
	<finder :service="service" :parameters="parameters">
		<template #title>
			<slot name="title"></slot>
		</template>

		<template #no-data>
			<slot name="no-data"></slot>
		</template>

		<template #list="props">
			<v-col v-for="dish in props.records" cols="12" sm="6" md="4" xl="3">
				<dish-card :to="{ name: '' }" :dish="dish" class="fill-height">
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

	interface Properties {
		parameters?: CRUDGetParameters;
	}

	withDefaults(defineProps<Properties>(), { parameters: () => new Object() });

	const service = new DishService();

	const { t } = useI18n();
</script>