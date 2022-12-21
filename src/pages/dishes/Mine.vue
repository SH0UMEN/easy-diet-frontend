<template>
	<v-container>
		<v-row>
			<v-col>
				<h2 class="text-center">{{ t('dishes.mine.title') }}</h2>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-text-field v-model="search" :label="t('dishes.list.search')" variant="solo" hide-details class="mb-1"></v-text-field>
			</v-col>
		</v-row>

		<v-row v-if="!$vuetify.display.mobile">
			<v-col>
				<v-btn :to="{ name: 'dishes-create' }" color="yellow-accent-3" class="mb-1" size="large" block>
					{{ t('dishes.create.floating') }}
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" sm="6" md="4" xl="3" v-for="dish in dishes">
				<dish-card :to="{ name: '' }" :dish="dish" class="fill-height">
					<template v-slot:actions>
						<v-card-actions class="justify-end">
							<v-btn @click="onDelete(dish.id)" color="red-accent-2" variant="text">{{ t('dishes.mine.delete') }}</v-btn>
						</v-card-actions>
					</template>
				</dish-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
	import DishCard from '@/components/cards/DishCard.vue';
	import { onMounted, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';
	import DishService from '@/services/dish';
	import useStore from '@/store/auth';
	import Dish from '@/models/dish';
	import router from '@/router';

	const dishes = ref<Array<Dish>>([]);
	const search = ref('');

	const service = new DishService();
	const { user } = storeToRefs(useStore());
	const { t } = useI18n();

	const load = async () => {
		dishes.value = await service.read({ author: user.value?.id });
	}

	const onDelete = async (id: number) => {
		await service.delete(id);
		load();
	}

	onMounted(() => {
		if(user.value == null)
			return router.push({ name: 'login' });

		load();
	});
</script>