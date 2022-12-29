import { toLoginIfNotAuthenticated } from '@/router/middleware';
import { RouteLocationNormalized } from 'vue-router';

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
			path: 'mine',
			beforeEnter: toLoginIfNotAuthenticated,
			children: [
				{
					name: 'dishes-mine',
					path: '',
					meta: {
						title: 'titles.dishes.mine'
					},
					component: () => import('@/pages/dishes/Mine.vue'),
				},
				{
					name: 'dishes-edit',
					path: ':id',
					meta: {
						title: 'titles.dishes.edit'
					},
					component: () => import('@/pages/dishes/Edit.vue'),
					props: (route: RouteLocationNormalized) => {
						const id = route.params.id;
						return { id: id instanceof Array ? id : parseInt(id) };
					}
				}
			]
		}
	]
};