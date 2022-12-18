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
				<v-card>
					<v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
						<v-card-title>{{ dish.title }}</v-card-title>
					</v-img>

					<v-card-subtitle class="pt-4">
						Number 10
					</v-card-subtitle>

					<v-card-text>
						<div>Whitehaven Beach</div>
						<div>Whitsunday Island, Whitsunday Islands</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange">Share</v-btn>
						<v-btn color="orange">Explore</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import { onBeforeMount, reactive } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';
	import router from '@/router';
	import useStore from '@/store/auth';
	import DishService from '@/services/dish';
	import Dish from '@/models/dish';

	const dishes = reactive<Array<Dish>>([]);

	const { user } = storeToRefs(useStore());
	const { t } = useI18n();

	onBeforeMount(async () => {
		if(user.value == null)
			return router.push({ name: 'login' });

		const items = await new DishService().read({ author: user.value.id });

		items.map((element) => {
			dishes.push(element);
		});
	});
</script>