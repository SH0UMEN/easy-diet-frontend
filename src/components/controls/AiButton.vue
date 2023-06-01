<template>
	<v-progress-circular v-if="loading" size="24" indeterminate></v-progress-circular>
	<v-tooltip v-else :text="!disabled ? t('ai.generate') : t('ai.disabled')" location="top" max-width="180">
		<template v-slot:activator="{ props }">
			<v-icon v-if="disabled" v-bind="props" @click.stop>mdi-brain</v-icon>
			<v-btn v-else v-bind="props" @click.stop="onClick" icon="mdi-brain" flat size="24" variant="plain"></v-btn>
		</template>
	</v-tooltip>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';

	type Properties = {
		disabled: boolean;
		loading: boolean;
	}

	const emit = defineEmits(['click']);
	const properties = defineProps<Properties>();

	const { t } = useI18n();

	const onClick = () => {
		emit('click');
	}
</script>