import axios from 'axios';
import User from '@/models/user';
import Status from '@/magic/status';
import Error from '@/magic/error';
import URL from '@/magic/url';
import Serializer from '@/serializers/serializer';

class AuthService {
	private serializer = new Serializer<User>();

	protected getLoginUrl(): string {
		return URL.Auth + 'login';
	}

	protected getLogoutUrl(): string {
		return URL.Auth + 'logout';
	}

	protected getVerifyUrl(): string {
		return URL.Auth + 'verify';
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
			case Error.UserIsNotActive:
				return 'errors.userIsNotActive';
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

	protected async post(url: string, user: User): Promise<User> {
		return (await axios.post(url, this.serializer.toFormData(user))).data;
	}

	public async login(user: User): Promise<User> {
		return await this.post(this.getLoginUrl(), user);
	}

	public async registration(user: User): Promise<boolean> {
		return (await axios.post(this.getRegistrationUrl(), this.serializer.toFormData(user))).status == Status.OK;
	}

	public async logout(): Promise<boolean> {
		return (await axios.post(this.getLogoutUrl())).status == Status.OK;
	}

	public async verify(code: string): Promise<boolean> {
		const data = new FormData();
		data.set('code', code);

		return (await axios.post(this.getVerifyUrl(), data)).status == Status.OK;
	}

	public async me(): Promise<User> {
		return (await axios.get(this.getMeUrl())).data;
	}
}

export default AuthService;