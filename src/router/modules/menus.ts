export default {
	name: 'menus',
	path: '/menus',
	component: () => import('@/pages/dishes/Index.vue'),
	children: [
		{
			name: 'menus-all',
			path: 'all',
			component: () => import('@/pages/dishes/All.vue')
		},
		{
			name: 'menus-mine',
			path: 'mine',
			component: () => import('@/pages/dishes/Mine.vue')
		}
	]
};