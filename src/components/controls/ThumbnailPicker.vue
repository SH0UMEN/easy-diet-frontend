<template>
	<v-file-input :label="label"
				  @update:modelValue="onImageSelected"
				  :rules="imageRules"
				  accept="image/png,image/jpeg,image/bmp"
				  prepend-icon="mdi-camera"
				  variant="solo"
				  class="mb-2"
				  outlined
				  dense>
	</v-file-input>
	<v-img v-if="modelValue != null" :src="imageUrl"></v-img>
</template>

<script setup lang="ts">
	import { defineEmits, defineProps, ref } from 'vue';
	import { getImageDataUrl } from '@/utils';

	type Properties = {
		modelValue?: File;
		imageRules: Array<Function>;
		label: string;
	}

	const emit = defineEmits(['update:modelValue']);
	const properties = defineProps<Properties>();

	const imageUrl = ref('');

	const onImageSelected = async (value: Array<File>) => {
		let newValue = value[0];

		emit('update:modelValue', newValue);

		if(newValue != null)
			imageUrl.value = await getImageDataUrl(newValue);
	};
</script>