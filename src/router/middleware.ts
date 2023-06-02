import { RouteLocationNormalized } from 'vue-router';
import useStore from '@/store/auth';

export function toIndexIfAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function): void {
	const store = useStore();
	const check = () => {
		next(store.user != null ? { name: 'dishes-mine' } : null);
	};

	store.userLoadingPromise == null ? check() : store.userLoadingPromise.finally(check);
}

export function toLoginIfNotAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function): void {
	const store = useStore();
	const check = () => {
		next(store.user == null ? { name: 'login' } : null);
	};

	store.userLoadingPromise == null ? check() : store.userLoadingPromise.finally(check);
}