<template>
	<v-select :items="$i18n.availableLocales"
			  v-model="$i18n.locale"
			  :label="t('lang')"
			  density="compact"
			  :hide-details="true"
			  variant="underlined">
	</v-select>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>