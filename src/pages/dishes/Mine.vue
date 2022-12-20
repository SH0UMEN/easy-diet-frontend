<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" md="4" xl="3" class="grow" v-if="!$vuetify.display.mobile">
				<v-card :to="{ name: 'dishes-create' }" color="yellow-accent-3" class="d-flex fill-height align-center justify-center">
					<v-card-title class="d-flex flex-column align-center">
						<v-icon class="text-h3">mdi-plus-circle</v-icon>
						{{ t('dishes.create.floating') }}
					</v-card-title>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="4" xl="3" v-for="dish in dishes">
				<v-card :to="{ name: '' }" max-width="374" class="mx-auto">
					<v-img :src="dish.image" cover height="250"></v-img>

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
						<div>{{ dish.description }}</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="deep-purple-lighten-2" variant="text">Reserve</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';
	import DishService from '@/services/dish';
	import useStore from '@/store/auth';
	import Dish from '@/models/dish';
	import router from '@/router';

	const dishes = ref<Array<Dish>>([]);

	const { user } = storeToRefs(useStore());
	const { t } = useI18n();

	onMounted(async () => {
		if(user.value == null)
			return router.push({ name: 'login' });

		dishes.value = await new DishService().read({ author: user.value.id });
	});
</script>