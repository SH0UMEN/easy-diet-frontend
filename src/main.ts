import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import { getCookie } from '@/utils';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
	if(config.headers == null)
		config.headers = {};

	config.headers['X-CSRFToken'] = getCookie('csrftoken');

	return config;
});

createApp(App).use(ElementPlus).use(createPinia()).use(router).mount('#app');
