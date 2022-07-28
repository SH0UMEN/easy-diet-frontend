export interface IService {
}

export const defineService = (service: IService): Function => {
	return (): IService => service;
}