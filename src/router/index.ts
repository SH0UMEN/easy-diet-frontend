import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		name: 'auth',
		path: '/auth',
		component: () => import('@/pages/auth/Index.vue'),
		children: [
			{
				name: 'login',
				path: 'login',
				component: () => import('@/pages/auth/Login.vue')
			}
		]
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
