<template>
	<v-navigation-drawer width="320" theme="dark">
		<logo v-if="!$vuetify.display.mobile" class="px-4 pt-4 text-h6"></logo>

		<v-list nav class="mt-4">
			<v-list-item prepend-icon="mdi-view-list" :title="t('navigation.menus.all')" :to="{ name: 'menus-all' }"></v-list-item>
			<v-list-item prepend-icon="mdi-view-list-outline" :title="t('navigation.menus.mine')" :to="{ name: 'menus-mine' }"></v-list-item>
			<v-list-item prepend-icon="mdi-food-turkey" :title="t('navigation.dishes.all')" :to="{ name: 'dishes-all' }"></v-list-item>
			<v-list-item prepend-icon="mdi-food-variant" :title="t('navigation.dishes.mine')" :to="{ name: 'dishes-mine' }"></v-list-item>
		</v-list>

		<template v-slot:append>
			<div v-if="user != null" class="pa-2 mb-3 d-flex align-center justify-center">
				<v-avatar class="mx-2" color="indigo" size="28"></v-avatar>
				<span class="text-body-1">{{ user.username }}</span>
				<v-divider vertical class="ml-4 my-2"></v-divider>
				<v-btn variant="plain" @click="logout">{{ t('navigation.logout') }}</v-btn>
			</div>

			<div v-else class="pa-2 mb-3">
				<v-btn :to="{ name: 'login' }" color="yellow-accent-3" size="small" block class="mb-2">{{ t('navigation.login') }}</v-btn>
				<v-btn :to="{ name: 'registration' }" variant="plain" size="small">{{ t('navigation.registration') }}</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
	import Logo from '@/components/app/Logo.vue';
	import { useI18n } from 'vue-i18n';
	import useStore from '@/store/auth';
	import { storeToRefs } from 'pinia';
	import router from '@/router';

	const { t } = useI18n();

	const store = useStore();
	const { user } = storeToRefs(store);

	const logout = async () => {
		await store.logout();

		router.push({ name: 'login' });
	};
</script>