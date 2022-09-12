import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { toIndexIfAuthenticated } from '@/router/middleware';

const routes: Array<RouteRecordRaw> = [
	{
		name: 'auth',
		path: '/auth',
		component: () => import('@/pages/auth/Index.vue'),
		beforeEnter: toIndexIfAuthenticated,
		children: [
			{
				name: 'login',
				path: 'login',
				component: () => import('@/pages/auth/Login.vue')
			},
			{
				name: 'registration',
				path: 'registration',
				component: () => import('@/pages/auth/Registration.vue')
			}
		]
	},
	{
		name: 'index',
		path: '/',
		component: () => import('@/pages/auth/Index.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
