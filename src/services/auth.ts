import axios, { AxiosError } from 'axios';
import User from '@/models/user';
import Status from '@/magic/status';
import Error from '@/magic/error';
import URL from '@/magic/url';

class AuthService {
	protected getLoginUrl(): string {
		return URL.Auth + 'login';
	}

	protected getLogoutUrl(): string {
		return URL.Auth + 'logout';
	}

	protected getMeUrl(): string {
		return URL.Auth + 'me';
	}

	protected getRegistrationUrl(): string {
		return URL.Auth + 'registration';
	}

	public handleErrors(exception: any): string {
		switch(parseInt(exception.request.response)) {
			case Error.UserIsAuthenticated:
				return 'errors.userIsAuthenticated';
			case Error.UsernameIsBusy:
				return 'errors.usernameIsBusy';
			case Error.UserNotFound:
				return 'errors.userNotFound';
			case Error.DataNotValid:
				return 'errors.dataNotValid';
			default:
				return 'errors.unknown';
		}
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

export default AuthService;