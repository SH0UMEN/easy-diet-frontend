import URL from '@/magic/url';
import axios from 'axios';
import { User } from '@/models/user';
import { IService, defineService } from '@/services/service';
import Status from '@/magic/status';

class AuthService implements IService {
	protected getLoginUrl(): string {
		return URL.AUTH + 'login';
	}

	protected getLogoutUrl(): string {
		return URL.AUTH + 'logout';
	}

	protected getMeUrl(): string {
		return URL.AUTH + 'me';
	}

	protected getRegistrationUrl(): string {
		return URL.AUTH + 'registration';
	}

	async login(username: string, password: string): Promise<User> {
		return (await axios.post(this.getLoginUrl(), { username, password })).data;
	}

	async logout(): Promise<boolean> {
		return (await axios.post(this.getLogoutUrl())).status == Status.OK;
	}

	async me(): Promise<User> {
		return (await axios.get(this.getMeUrl())).data;
	}

	async registration(username: string, password: string): Promise<void> {
		await axios.post(this.getRegistrationUrl(), { username, password });
	}
}

export default defineService(new AuthService());