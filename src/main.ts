import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { getCookie } from '@/utils';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
	if (config.headers == null)
		config.headers = {};

	config.headers['X-CSRFToken'] = getCookie('csrftoken');

	return config;
});

loadFonts();

createApp(App).use(router).use(vuetify).mount('#app');
