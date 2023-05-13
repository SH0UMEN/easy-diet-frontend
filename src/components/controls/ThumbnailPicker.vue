<template>
	<v-file-input :label="label"
				  @update:modelValue="onImageSelected"
				  :rules="imageRules"
				  accept="image/png,image/jpeg,image/bmp,image/webp"
				  prepend-icon="mdi-camera"
				  variant="solo"
				  class="mb-2"
				  outlined
				  dense>
	</v-file-input>
	<v-img v-if="imageUrl !== ''" :src="imageUrl"></v-img>
</template>

<script setup lang="ts">
	import { defineEmits, defineProps, ref } from 'vue';
	import { getImageDataUrl, isString } from '@/utils';

	type Properties = {
		modelValue?: File | string;
		imageRules: Array<Function>;
		label: string;
	}

	const emit = defineEmits(['update:modelValue']);
	const properties = defineProps<Properties>();

	const imageUrl = ref(isString(properties.modelValue) ? properties.modelValue : '');

	const onImageSelected = async (value: Array<File>) => {
		let newValue = value[0];
		imageUrl.value = '';

		emit('update:modelValue', newValue);

		if(newValue != null)
			imageUrl.value = await getImageDataUrl(newValue);
	};
</script>