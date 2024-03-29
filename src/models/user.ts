import IModel from '@/models/model';

interface User extends IModel {
	id?: number;
	username: string;
	password?: string;
	isSuperuser?: boolean;
	email?: string;
}

export default User;