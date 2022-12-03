export default {
	name: 'menus',
	path: '/menus',
	component: () => import('@/pages/menus/Index.vue'),
	children: [
		{
			name: 'menus-create',
			path: 'create',
			component: () => import('@/pages/menus/Create.vue')
		},
		{
			name: 'menus-all',
			path: 'all',
			component: () => import('@/pages/menus/All.vue')
		},
		{
			name: 'menus-mine',
			path: 'mine',
			component: () => import('@/pages/menus/Mine.vue')
		}
	]
};