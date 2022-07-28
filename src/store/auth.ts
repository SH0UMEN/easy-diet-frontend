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
		setUsername(username: string): void {
			if(this.user != null)
				this.user.username = username;
		},

		async me(): Promise<void> {
			this.user = await useService().me();
		}
	}
});