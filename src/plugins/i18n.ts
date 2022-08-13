import { createI18n } from 'vue-i18n';
import ru from '@/i18n/ru.json';
import en from '@/i18n/en.json';

export default createI18n<typeof ru, 'ru' | 'en'>({
	legacy: false,
	locale: 'ru',
	messages: {
		ru, en
	},
});
