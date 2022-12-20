<template>
	<v-card class="d-flex flex-column">
		<v-img :src="dish.image" height="250" class="flex-grow-0" cover></v-img>

		<v-card-item>
			<v-card-title>{{ dish.title }}</v-card-title>

			<v-card-subtitle>
				<span class="mr-1">{{ dish.author?.username }}</span>
				<v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
			</v-card-subtitle>
		</v-card-item>

		<v-card-text>
			<v-row align="center" class="mx-0 mb-4">
				<v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly size="small"></v-rating>
				<div class="text-grey ms-4">4.5 (413)</div>
			</v-row>

			<!--						<div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>-->
			<div>{{ dish.descriptionShort }}</div>
		</v-card-text>

		<slot name="actions"></slot>
	</v-card>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import Dish from '@/models/dish';

	interface Properties {
		dish: Dish;
	}

	defineProps<Properties>();
</script>