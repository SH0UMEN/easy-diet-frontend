import axios, { AxiosResponse } from 'axios';
import CRUDGetParameters from '@/types/CRUDGetParameters';
import CRUDGetResponse from '@/types/CRUDGetResponse';
import Serializer from '@/serializers/serializer';

class CRUD<T> {
	protected root: string = '';
	protected serializer = new Serializer();

	protected getListUrl(): string {
		return this.root;
	}

	protected getDetailsUrl(id: (number | string)): string {
		return this.root + id;
	}

	public async get(): Promise<Array<T>>;
	public async get(id: number): Promise<T>;
	public async get(parameters: CRUDGetParameters): Promise<CRUDGetResponse<T>>;
	public async get(arg?: number | CRUDGetParameters) {
		let response: AxiosResponse;

		if(arg != null && typeof arg == 'number')
			response = await axios.get(this.getDetailsUrl(arg));
		else
			response = await axios.get(this.getListUrl(), { params: arg });

		return response.data;
	}

	//
	// async post(): Promise<T> {
	// 	return (await axios.get(this.)).data;
	// }
}

export default CRUD;