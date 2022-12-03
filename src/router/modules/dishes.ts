export default {
	name: 'dishes',
	path: '/dishes',
	component: () => import('@/pages/dishes/Index.vue'),
	children: [
		{
			name: 'dishes-create',
			path: 'create',
			meta: {
				title: 'titles.dishes.create'
			},
			component: () => import('@/pages/dishes/Create.vue')
		},
		{
			name: 'dishes-all',
			path: 'all',
			meta: {
				title: 'titles.dishes.all'
			},
			component: () => import('@/pages/dishes/All.vue')
		},
		{
			name: 'dishes-mine',
			path: 'mine',
			meta: {
				title: 'titles.dishes.mine'
			},
			component: () => import('@/pages/dishes/Mine.vue')
		}
	]
};