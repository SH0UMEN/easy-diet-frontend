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
		name: 'food',
		path: '/food',
		component: () => import('@/pages/food/Index.vue'),
		children: [
			{
				name: 'food-all',
				path: 'all',
				component: () => import('@/pages/food/All.vue')
			},
			{
				name: 'food-mine',
				path: 'mine',
				component: () => import('@/pages/food/Mine.vue')
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
