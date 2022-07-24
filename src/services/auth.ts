import Urls from "@/services/urls";
import axios from "axios";

export class AuthService {
	getLoginUrl(): string {
		return Urls.AUTH + 'login';
	}

	async login(name: string, password: string) {
		return await axios.post(this.getLoginUrl(), { name, password });
	}
}