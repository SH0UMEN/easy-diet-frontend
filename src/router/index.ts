import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import auth from './modules/auth';
import dishes from './modules/dishes';
import menus from './modules/menus';

const routes: Array<RouteRecordRaw> = [
	{
		name: 'index',
		path: '/',
		meta: {
			title: 'titles.index'
		},
		redirect: { name: 'menus-all' },
		children: [ auth, dishes, menus ]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
