<template>
	<v-responsive max-width="758" class="mx-auto">
		<v-container class="mt-6">
			<v-tabs v-model="tab" class="ml-6" color="yellow-accent-4">
				<v-tab :value="0" :to="{ name: 'food-all' }">Все</v-tab>
				<v-tab :value="1" :to="{ name: 'food-mine' }">Мои блюда</v-tab>
			</v-tabs>
			<v-window v-model="tab">
				<v-window-item :value="0">
					<v-card class="mx-auto" max-width="400">
						<v-img class="align-end text-white"
							height="200"
							src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
							cover>
							<v-card-title>Top 10 Australian beaches</v-card-title>
						</v-img>

						<v-card-subtitle class="pt-4">
							Number 10
						</v-card-subtitle>

						<v-card-text>
							<div>Whitehaven Beach</div>
							<div>Whitsunday Island, Whitsunday Islands</div>
						</v-card-text>

						<v-card-actions>
							<v-btn color="orange">
								Share
							</v-btn>

							<v-btn color="orange">
								Explore
							</v-btn>
						</v-card-actions>
					</v-card>
					<v-card class="mx-auto" max-width="400">
						<v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
							<v-card-title>Top 10 Australian beaches</v-card-title>
						</v-img>

						<v-card-subtitle class="pt-4">
							Number 10
						</v-card-subtitle>

						<v-card-text>
							<div>Whitehaven Beach</div>

							<div>Whitsunday Island, Whitsunday Islands</div>
						</v-card-text>

						<v-card-actions>
							<v-btn color="orange">
								Share
							</v-btn>

							<v-btn color="orange">
								Explore
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-window-item>
				<v-window-item :value="1">
					<v-card>
						<v-card-text>2222</v-card-text>
					</v-card>
				</v-window-item>
			</v-window>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
// import useStore from '@/store/auth';
// import { storeToRefs } from 'pinia';
// import router from '@/router';
//
// const { user } = storeToRefs(useStore());

import { ref } from 'vue';

const tab = ref(0);

//
// if(user.value != null)
// 	router.push({ name: 'index' });
</script>