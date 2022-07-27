import { defineStore, StateTree } from 'pinia';
import { User } from "@/models/user";

type AuthState = StateTree & {
	user?: User;
}

export default defineStore('auth', {
	state(): AuthState {
		return {
		};
	},
	actions: {
		setUsername(username: string): void {
			if(this.user != null)
				this.user.username = username;
		}
	}
});