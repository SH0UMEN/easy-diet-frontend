import { defineStore, StateTree } from 'pinia';
import AuthService from '@/services/auth';
import User from '@/models/user';

type AuthState = StateTree & {
	user: User | null;
	userLoadingPromise: Promise<User> | null;
}

export default defineStore('auth', {
	state(): AuthState {
		return {
			user: null,
			userLoadingPromise: null
		};
	},
	actions: {
		async login(username: string, password: string): Promise<void> {
			this.user = await new AuthService().login({ username, password });
		},

		async logout(): Promise<void> {
			if(await new AuthService().logout())
				this.user = null;
		},

		async me(): Promise<void> {
			this.userLoadingPromise = new AuthService().me();

			try {
				this.user = await this.userLoadingPromise;
			} catch(e) {
				this.user = null;
			}

			this.userLoadingPromise = null;
		}
	}
});