import Urls from "@/magic/urls";
import axios from "axios";
import {User} from "@/models/user";
import IService from "@/services/service";
import { defineService } from "@/utils";

class AuthService implements IService {
	getLoginUrl(): string {
		return Urls.AUTH + 'login';
	}

	getLogoutUrl(): string {
		return Urls.AUTH + 'logout';
	}

	getMeUrl(): string {
		return Urls.AUTH + 'me';
	}

	async login(username: string, password: string): Promise<User> {
		return (await axios.post(this.getLoginUrl(), { username, password })).data;
	}

	async logout(): Promise<void> {
		return await axios.post(this.getLogoutUrl());
	}

	async me(): Promise<User> {
		return (await axios.get(this.getMeUrl())).data;
	}
}

export default defineService(new AuthService());