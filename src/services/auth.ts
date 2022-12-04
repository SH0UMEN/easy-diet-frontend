import axios, { AxiosError } from 'axios';
import { User } from '@/models/user';
import { IService, defineService } from '@/services/service';
import Status from '@/magic/status';
import Error from '@/magic/error';
import URL from '@/magic/url';

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

	public handleErrors(exception: any): string | null {
		let error: string | null = null;

		if(exception instanceof AxiosError) {
			switch(parseInt(exception.request.response)) {
				case Error.UserIsAuthenticated:
					error = 'errors.userIsAuthenticated';
					break;
				case Error.UsernameIsBusy:
					error = 'errors.usernameIsBusy';
					break;
				case Error.UserNotFound:
					error = 'errors.userNotFound';
					break;
				case Error.DataNotValid:
					error = 'errors.dataNotValid';
					break;
			}
		}

		return error;
	}

	public async login(username: string, password: string): Promise<User> {
		return (await axios.post(this.getLoginUrl(), { username, password })).data;
	}

	public async logout(): Promise<boolean> {
		return (await axios.post(this.getLogoutUrl())).status == Status.OK;
	}

	public async me(): Promise<User> {
		return (await axios.get(this.getMeUrl())).data;
	}

	public async registration(username: string, password: string): Promise<void> {
		await axios.post(this.getRegistrationUrl(), { username, password });
	}
}

export default defineService(new AuthService());