import { getCookie } from '@/utils';
import axios from 'axios';

export default function configureAxios() {
	axios.defaults.withCredentials = true;
	axios.interceptors.request.use((config) => {
		if(config.headers == null)
			config.headers = {};

		config.headers['X-CSRFToken'] = getCookie('csrftoken');

		return config;
	});
};