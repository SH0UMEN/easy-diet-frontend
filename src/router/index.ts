import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import auth from './modules/auth';
import dishes from './modules/dishes';
import menus from './modules/menus';

const routes: Array<RouteRecordRaw> = [
	auth,
	dishes,
	menus,
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
