<template>
	<v-responsive max-width="758" class="mx-auto">
		<v-container class="mt-6">
			<v-tabs v-model="tab" color="yellow-accent-4">
				<v-tab :value="0" :to="{ name: 'dishes-all' }">Все</v-tab>
				<v-tab :value="1" :to="{ name: 'dishes-mine' }">Мои блюда</v-tab>
			</v-tabs>
			<v-window v-model="tab">
				<v-window-item :value="0">
					<all></all>
				</v-window-item>
				<v-window-item :value="1">
					<mine></mine>
				</v-window-item>
			</v-window>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
	import All from '@/pages/dishes/All.vue';
	import Mine from '@/pages/dishes/Mine.vue';
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