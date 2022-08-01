<template>
	<v-app>
		<v-app-bar app>
			<v-container>
				<v-row>
					<v-col class="d-flex justify-end">
						<v-btn rounded="pill" variant="plain">Меню</v-btn>
						<v-btn rounded="pill" variant="plain">Блюда</v-btn>
					</v-col>

					<v-divider class="my-5" vertical></v-divider>

					<v-col class="d-flex align-center justify-center py-0" cols="1">
						<v-img max-height="44" :src="require('@/assets/food-cheese-stinky.svg')"/>
					</v-col>

					<v-divider class="my-5" vertical></v-divider>

					<v-col class="d-flex align-center">
						<div v-if="user != null" class="d-flex align-center">
							<v-avatar class="mx-2" color="indigo" size="32"></v-avatar>
							<span>{{ user.username }}</span>
							<v-btn rounded="pill" variant="plain" @click="logout">Выйти</v-btn>
						</div>

						<v-btn v-else>Войти</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-app-bar>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import useStore from '@/store/auth';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const store = useStore();
const { user } = storeToRefs(store);

onBeforeMount(() => {
	store.me();
});

const logout = () => {
	store.logout();
};

</script>
