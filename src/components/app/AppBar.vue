<template>
	<v-app-bar app>
		<v-container>
			<v-row>
				<v-col class="d-flex justify-end">
					<v-btn variant="plain">{{ t('navigation.menus') }}</v-btn>
					<v-btn variant="plain">{{ t('navigation.food') }}</v-btn>
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
						<v-btn variant="plain" @click="logout">{{ t('navigation.logout') }}</v-btn>
					</div>

					<div class="d-flex" v-else>
						<v-btn :to="{ name: 'login' }" variant="plain">{{ t('navigation.login') }}</v-btn>
						<v-btn :to="{ name: 'registration' }" variant="plain">{{ t('navigation.registration') }}</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app-bar>
</template>

<script setup lang="ts">
import useStore from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { user } = storeToRefs(store);

const { t } = useI18n();

const logout = () => {
	store.logout();
};
</script>