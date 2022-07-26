import Urls from "@/services/urls";
import axios from "axios";

export class AuthService {
	getLoginUrl(): string {
		return Urls.AUTH + 'login';
	}

	getLogoutUrl(): string {
		return Urls.AUTH + 'logout';
	}

	getMeUrl(): string {
		return Urls.AUTH + 'me';
	}

	async login(username: string, password: string) {
		return await axios.post(this.getLoginUrl(), { username, password });
	}

	async logout() {
		return await axios.post(this.getLogoutUrl());
	}

	async me() {
		return await axios.get(this.getMeUrl());
	}
}