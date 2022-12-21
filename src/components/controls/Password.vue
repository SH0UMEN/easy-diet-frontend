<template>
	<div>
		<v-text-field :label="t('auth.password.main')"
					  :rules="passwordRules"
					  v-model="password"
					  @input="onPasswordInput"
					  variant="solo"
					  class="mb-2"
					  type="password">
		</v-text-field>
		<v-text-field :label="t('auth.password.repeat')"
					  :error-messages="passwordErrors"
					  :rules="passwordRules"
					  v-model="repeatedPassword"
					  @input="onPasswordInput"
					  v-if="repeat"
					  variant="solo"
					  type="password">
		</v-text-field>
	</div>
</template>

<script setup lang="ts">
	import ValidationService from '@/services/validation';
	import { defineProps, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	interface Properties {
		modelValue?: string;
		repeat: boolean;
	}

	const emit = defineEmits(['update:modelValue']);
	const properties = withDefaults(defineProps<Properties>(), { repeat: false });

	const { t } = useI18n();

	const passwordRules = reactive(ValidationService.password(t));
	const passwordErrors = reactive<Array<string>>([]);

	const password = ref(properties.modelValue);
	const repeatedPassword = ref(properties.modelValue);

	const onPasswordInput = () => {
		passwordErrors.pop();

		if(repeatedPassword.value != null && repeatedPassword.value != '' && repeatedPassword.value != password.value)
			passwordErrors.push(t('auth.password.error'));

		if(passwordErrors.length == 0)
			emit('update:modelValue', password.value);
	}
</script>