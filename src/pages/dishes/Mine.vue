<template>
	<v-container class="fill-height">
		<progress-circular v-if="initialLoading"></progress-circular>

		<template v-else>
			<div v-if="dishes.length == 0 && search == '' && !searching" class="d-flex justify-center align-center fill-height flex-column">
				<span class="text-h6 mb-4">{{ t('dishes.mine.noData') }}</span>
				<v-btn :to="{ name: 'dishes-create' }" color="yellow-accent-3">{{ t('dishes.create.floating') }}</v-btn>
			</div>

			<template v-else>
				<v-row>
					<v-col>
						<h2 class="text-center">{{ t('dishes.mine.title') }}</h2>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-text-field v-model="search" :label="t('dishes.list.search')" :loading="searching" variant="solo" hide-details class="mb-1"></v-text-field>
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
			</template>
		</template>
	</v-container>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import DishCard from '@/components/cards/DishCard.vue';
	import { onBeforeMount, ref, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import { debounce } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import CRUDGetParameters from '@/types/CRUDGetParameters';
	import DishService from '@/services/dish';
	import useStore from '@/store/auth';
	import Dish from '@/models/dish';

	const dishes = ref<Array<Dish>>([]);
	const initialLoading = ref(true);
	const searching = ref(false);
	const search = ref('');

	const service = new DishService();
	const { user } = storeToRefs(useStore());
	const { t } = useI18n();

	const load = async () => {
		const parameters: CRUDGetParameters = { author: user.value?.id };
		if(search.value != '')
			parameters.search = search.value;

		dishes.value = await service.read(parameters);
		initialLoading.value = false;
		searching.value = false;
	};

	const onDelete = async (id: number) => {
		await service.delete(id);
		load();
	};

	const loadDebounced = debounce(load, 250);

	watch(search, () => {
		searching.value = true;
		loadDebounced();
	});

	onBeforeMount(load);
</script>