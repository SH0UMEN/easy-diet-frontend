import { RouteLocationNormalized } from 'vue-router';
import useStore from '@/store/auth';

export function toIndexIfAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function): void {
	const store = useStore();
	const check = () => {
		next(store.user != null ? { name: 'dishes-mine' } : null);
	};

	if(store.userLoadingPromise == null)
		return check();
	else
		store.userLoadingPromise.then(check);
}

export function toLoginIfNotAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function): void {
	const store = useStore();
	const check = () => {
		next(store.user == null ? { name: 'login' } : null);
	};

	if(store.userLoadingPromise == null)
		check();
	else
		store.userLoadingPromise.then(check);
}