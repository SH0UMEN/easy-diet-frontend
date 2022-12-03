<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click="onIconClick"></v-app-bar-nav-icon>

		<v-app-bar-title class="pl-2">
			<div class="d-flex flex-row">
				<logo></logo>
				<v-spacer></v-spacer>
				<toolbar></toolbar>

				<div class="ml-4">
					<language-selector></language-selector>
				</div>
			</div>
		</v-app-bar-title>
	</v-app-bar>
</template>

<script setup lang="ts">
	import LanguageSelector from '@/components/app/LanguageSelector.vue';
	import Toolbar from '@/components/app/Toolbar.vue';
	import Logo from '@/components/app/Logo.vue';
	import { useI18n } from 'vue-i18n';
	import { defineEmits } from 'vue';

	const emit = defineEmits(['navToggled']);

	const { t } = useI18n();

	const onIconClick = () => {
		emit('navToggled');
	};
</script>