import CRUDPaginationParameters from '@/types/CRUDPaginationParameters';
import CRUDPaginationResponse from '@/types/CRUDPaginationResponse';
import CRUDGetParameters from '@/types/CRUDGetParameters';
import Serializer from '@/serializers/serializer';
import axios, { AxiosResponse } from 'axios';
import IModel from '@/models/model';

class CRUD<T extends IModel = IModel> {
	protected root: string = '';
	protected serializer = new Serializer();

	protected getListAndCreateUrl(): string {
		return this.root;
	}

	protected getDetailsAndDeleteUrl(id: (number | string)): string {
		return this.root + id;
	}

	public async read(id: number): Promise<T>;
	public async read(parameters?: CRUDGetParameters): Promise<Array<T>>;
	public async read(parameters?: CRUDPaginationParameters): Promise<CRUDPaginationResponse<T>>;
	public async read(arg?: number | CRUDGetParameters | CRUDPaginationParameters) {
		let response: AxiosResponse;

		if(arg != null && typeof arg == 'number')
			response = await axios.get(this.getDetailsAndDeleteUrl(arg));
		else
			response = await axios.get(this.getListAndCreateUrl(), { params: arg });

		return response.data;
	}

	async create(data: T): Promise<T> {
		return (await axios.post(this.getListAndCreateUrl(), this.serializer.toFormData(data))).data;
	}

	async delete(id: number) {
		await axios.delete(this.getDetailsAndDeleteUrl(id));
	}
}

export default CRUD;