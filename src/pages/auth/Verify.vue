<template>
	<div v-if="code == null || code == ''" class="d-flex text-center justify-center">
		<h4 v-if="showError">{{ t('auth.verify.error') }}</h4>
		<h4 v-else>{{ t('auth.verify.help') }}</h4>
	</div>

	<progress-circular v-else></progress-circular>
</template>

<script setup lang="ts">
	import ProgressCircular from '@/components/indicators/ProgressCircular.vue';
	import { onMounted, ref } from 'vue';
	import AuthService from '@/services/auth';
	import router from '@/router';
	import { useI18n } from 'vue-i18n';

	type Properties = {
		code: string | null;
	}

	const properties = defineProps<Properties>();

	const { t } = useI18n();

	const code = ref(properties.code);
	const showError = ref(false);

	onMounted(async () => {
		if(code.value == null || code.value == '')
			return;

		const service = new AuthService();
		
		try {
			await service.verify(code.value);
			router.push({ name: 'login' });
		} catch(e) {
			showError.value = true;
			code.value = null;
		}
	});
</script>