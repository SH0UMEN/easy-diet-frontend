import { RouteLocationNormalized } from 'vue-router';
import useStore from '@/store/auth';

export function toIndexIfAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function): void {
	const store = useStore();
	next(store.user != null ? { name: 'index' } : null);
}