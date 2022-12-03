<template>
	<v-select :items="$i18n.availableLocales"
			  :label="t('lang')"
			  :hide-details="true"
			  v-model="$i18n.locale"
			  density="compact"
			  variant="underlined">
	</v-select>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
</script>