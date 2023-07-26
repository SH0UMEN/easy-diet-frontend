import { toLoginIfNotAuthenticated } from '@/router/middleware';
import { passQueryData } from '@/utils';

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
			name: 'menus-page',
			path: ':id',
			component: () => import('@/pages/menus/Page.vue'),
			props: passQueryData('id', true)
		},
		{
			path: 'mine',
			beforeEnter: toLoginIfNotAuthenticated,
			children: [
				{
					name: 'menus-mine',
					path: '',
					meta: {
						title: 'titles.menus.mine'
					},
					component: () => import('@/pages/menus/Mine.vue'),
				},
				{
					name: 'menus-edit',
					path: ':id',
					meta: {
						title: 'titles.menus.edit'
					},
					component: () => import('@/pages/menus/Edit.vue'),
					props: passQueryData('id', true)
				}
			]
		}
	]
};