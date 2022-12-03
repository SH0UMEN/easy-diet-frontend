export default {
	name: 'menus',
	path: '/menus',
	component: () => import('@/pages/menus/Index.vue'),
	children: [
		{
			name: 'menus-create',
			path: 'create',
			meta: {
				title: 'titles.menus.create'
			},
			component: () => import('@/pages/menus/Create.vue')
		},
		{
			name: 'menus-all',
			path: 'all',
			meta: {
				title: 'titles.menus.all'
			},
			component: () => import('@/pages/menus/All.vue')
		},
		{
			name: 'menus-mine',
			path: 'mine',
			meta: {
				title: 'titles.menus.mine'
			},
			component: () => import('@/pages/menus/Mine.vue')
		}
	]
};