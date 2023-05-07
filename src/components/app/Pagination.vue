<template>
	<v-pagination :length="pageCount"
				  :total-visible="$vuetify.display.mobile ? 1 : 7"
				  v-if="pageCount > 1"
				  v-model="page"
				  rounded="circle">
	</v-pagination>
</template>

<script setup lang="ts">
	import { computed, defineEmits, defineProps, ref, toRefs, watch, watchEffect } from 'vue';
	import CRUDPaginationParameters from '@/types/CRUDPaginationParameters';
	import { wrapModel } from '@/utils';

	type Properties = {
		modelValue: CRUDPaginationParameters;
		page: number;
		total: number;
	}

	const emit = defineEmits(['update:modelValue', 'update:page']);
	const properties = defineProps<Properties>();

	const parameters = ref(properties.modelValue);
	const onPage = ref(6);

	const page = wrapModel<number, Properties>(properties, emit, 'page');
	const { total } = toRefs(properties);

	const pageCount = computed(() => {
		return Math.ceil(total.value/onPage.value);
	});

	watch(page, () => {
		parameters.value.offset = (page.value - 1) * onPage.value;
		parameters.value.limit = onPage.value;

		emit('update:modelValue', parameters.value);
	}, { immediate: true });
</script>