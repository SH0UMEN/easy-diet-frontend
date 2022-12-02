export default {
	name: 'dishes',
	path: '/dishes',
	component: () => import('@/pages/dishes/Index.vue'),
	children: [
		{
			name: 'dishes-all',
			path: 'all',
			component: () => import('@/pages/dishes/All.vue')
		},
		{
			name: 'dishes-mine',
			path: 'mine',
			component: () => import('@/pages/dishes/Mine.vue')
		}
	]
};