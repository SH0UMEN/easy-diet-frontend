<template>
	<v-textarea v-model="inputValue"
				:readonly="loading"
				:rules="rules"
				ref="textarea"
				:label="label"
				variant="solo"
				class="mb-2">
		<template #append-inner>
			<ai-button :loading="loading" :disabled="!aiAvailable" @click="onClick"></ai-button>
		</template>
	</v-textarea>
</template>

<script setup lang="ts">
	import { toRefs, ref, watch, defineEmits, defineExpose } from 'vue';
	import AiButton from '@/components/controls/AiButton.vue';

	type Properties = {
		rules?: Array<Function>;
		aiAvailable: boolean;
		modelValue?: string;
		generator: Function;
		label?: string;
	}

	const emit = defineEmits(['update:modelValue']);
	const properties = withDefaults(defineProps<Properties>(), { rules: () => [], label: '', modelValue: '' });

	const { rules, label } = toRefs(properties);
	const inputValue = ref(properties.modelValue);
	const textarea = ref<any>(null);
	const loading = ref(false);

	let editor: HTMLTextAreaElement;

	const onMessage = (message: string, isEnd: boolean, isError: boolean) => {
		inputValue.value += (message || '');

		editor = editor || textarea.value.$el.querySelector('textarea');
		editor.scrollTop = editor.scrollHeight;

		if(isEnd || isError)
			loading.value = false;
	};

	const onClick = () => {
		loading.value = true;
		inputValue.value = '';

		properties.generator(onMessage);
	};

	const validate = () => {
		textarea.value.validate();
	};

	defineExpose({ validate });

	watch(inputValue, () => {
		emit('update:modelValue', inputValue.value);
	});
</script>