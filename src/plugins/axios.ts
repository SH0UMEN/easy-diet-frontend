import { getCookie } from '@/utils';
import router from '@/router';
import axios from 'axios';
import Status from '@/magic/status';

export default function configureAxios() {
	axios.defaults.withCredentials = true;

	axios.interceptors.response.use(undefined, (error) => {
		if(error.response.status == Status.Unauthorized)
			router.push({ name: 'login' });
	});

	axios.interceptors.request.use((config) => {
		if(config.headers == null)
			config.headers = {};

		config.headers['X-CSRFToken'] = getCookie('csrftoken');

		return config;
	});
};