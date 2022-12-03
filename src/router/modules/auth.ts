import { toIndexIfAuthenticated } from '@/router/middleware';

export default {
	name: 'auth',
	path: '/auth',
	component: () => import('@/pages/auth/Index.vue'),
	beforeEnter: toIndexIfAuthenticated,
	children: [
		{
			name: 'login',
			path: 'login',
			meta: {
				title: 'titles.login'
			},
			component: () => import('@/pages/auth/Login.vue')
		},
		{
			name: 'registration',
			path: 'registration',
			meta: {
				title: 'titles.registration'
			},
			component: () => import('@/pages/auth/Registration.vue')
		}
	]
};