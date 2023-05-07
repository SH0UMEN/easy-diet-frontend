<template>
	<v-navigation-drawer width="320" theme="dark" :expand-on-hover="!$vuetify.display.mobile" :rail="!$vuetify.display.mobile">
		<logo v-if="!$vuetify.display.mobile" :width="26" class="px-4 pt-4 text-h6"></logo>

		<v-divider class="mt-4"></v-divider>

		<v-list nav class="mt-1">
			<v-list-item prepend-icon="mdi-view-list" :title="t('navigation.menus.all')" :to="{ name: 'menus-all' }"></v-list-item>
			<v-list-item prepend-icon="mdi-view-list-outline" :title="t('navigation.menus.mine')" :to="{ name: 'menus-mine' }"></v-list-item>
			<v-list-item prepend-icon="mdi-food-turkey" :title="t('navigation.dishes.all')" :to="{ name: 'dishes-all' }"></v-list-item>
			<v-list-item prepend-icon="mdi-food-variant" :title="t('navigation.dishes.mine')" :to="{ name: 'dishes-mine' }"></v-list-item>
		</v-list>

		<div class="d-flex pl-4 mt-2">
			<language-selector></language-selector>
		</div>

		<template #append>
			<div v-if="user != null" class="pa-3 mb-3 d-flex align-center text-no-wrap overflow-hidden">
				<v-avatar color="yellow-accent-3" size="32" class="ml-auto mr-3" ></v-avatar>
				<span class="text-body-1">{{ user.username }}</span>
				<v-divider vertical class="ml-4 my-2"></v-divider>
				<v-btn class="mr-auto" variant="plain" @click="logout">{{ t('navigation.logout') }}</v-btn>
			</div>

			<div v-else class="mx-8 mb-4 overflow-hidden">
				<v-btn :to="{ name: 'login' }" color="yellow-accent-3" size="small" block class="mb-2">{{ t('navigation.login') }}</v-btn>
				<v-btn :to="{ name: 'registration' }" variant="plain" size="small" block>{{ t('navigation.registration') }}</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
	import LanguageSelector from '@/components/app/LanguageSelector.vue';
	import Logo from '@/components/app/Logo.vue';
	import { useI18n } from 'vue-i18n';
	import { storeToRefs } from 'pinia';
	import useStore from '@/store/auth';
	import router from '@/router';

	const { t } = useI18n();
	const store = useStore();
	const { user } = storeToRefs(store);

	const logout = async () => {
		await store.logout();

		router.push({ name: 'login' });
	};
</script>