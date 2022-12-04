import { defineStore, StateTree } from 'pinia';
import useService from '@/services/auth';
import { User } from '@/models/user';

type AuthState = StateTree & {
	user: User | null;
}

export default defineStore('auth', {
	state(): AuthState {
		return {
			user: null
		};
	},
	actions: {
		async login(username: string, password: string): Promise<void> {
			this.user = await useService().login(username, password);
		},

		async logout(): Promise<void> {
			if(await useService().logout())
				this.user = null;
		},

		async me(): Promise<void> {
			this.user = await useService().me();
		}
	}
});