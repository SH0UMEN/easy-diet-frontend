<template>
	<loader :id="id" :service="service">
		<template #form="{ record }: { record: Dish }">
			<h2 class="text-center mb-6">{{ record.title }}</h2>

			<v-responsive max-width="768" class="mx-auto">
				<v-img :src="record.image as string"></v-img>
				<div class="break-spaces mt-6">{{ record.descriptionFull }}</div>
			</v-responsive>
		</template>
	</loader>
</template>

<script setup lang="ts">
	import Loader from '@/components/loaders/Loader.vue';
	import DishService from '@/services/dish';
	import Dish from '@/models/dish';

	type Properties = {
		id: number;
	}

	const service = new DishService();
	const properties = defineProps<Properties>();
</script>