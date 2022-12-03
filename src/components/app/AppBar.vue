<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click="onIconClick"></v-app-bar-nav-icon>

		<v-app-bar-title>
			<logo></logo>
		</v-app-bar-title>
	</v-app-bar>
</template>

<script setup lang="ts">
	import Logo from '@/components/app/Logo.vue';
	import useStore from '@/store/auth';
	import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';
	import { defineEmits } from 'vue';

	const emit = defineEmits(['navToggled']);

	const { t } = useI18n();

	const store = useStore();
	const { user } = storeToRefs(store);

	const onIconClick = () => {
		emit('navToggled');
	};
</script>