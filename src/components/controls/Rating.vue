<template>
	<div>
		<div v-if="scoresCount > 0">
			{{ t('scores.overall') }}:
			<span class="ml-2 text-h6">{{ overallScore }}/5</span>
			({{ scoresCount }})
		</div>

		<div class="d-flex align-center" v-if="!readonly">
			{{ t('scores.your') }}:
			<v-rating v-model="score"
					  density="compact"
					  @update:modelValue="onInput"
					  class="ml-2"
					  color="amber">
			</v-rating>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { ref } from 'vue';

	type Properties = {
		modelValue: number;
		overallScore: number;
		scoresCount: number;
		readonly: boolean;
	}

	const properties = defineProps<Properties>();
	const emit = defineEmits(['update:modelValue']);
	const { t } = useI18n();

	const score = ref(properties.modelValue);

	const onInput = (value: number) => {
		score.value = value;
		emit('update:modelValue', value);
	};
</script>