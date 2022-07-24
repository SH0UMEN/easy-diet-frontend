import { defineStore } from 'pinia';
import { User } from "@/models/user";

type UserState = {
	user?: User
}

export default defineStore('user', {
	state(): UserState {
		return {
			user: new User('Admin')
		};
	},
	actions: {
		setUserName(name: string): void {
			if(this.user != null)
				this.user.name = name;
		}
	}
});