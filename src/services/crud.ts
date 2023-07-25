import CRUDPaginationParameters from '@/types/requests/CRUDPaginationParameters';
import CRUDPaginationResponse from '@/types/requests/CRUDPaginationResponse';
import CRUDGetParameters from '@/types/requests/CRUDGetParameters';
import Serializer from '@/serializers/serializer';
import axios, { AxiosResponse } from 'axios';
import IModel from '@/models/model';
import { isNumber, toSnakeCase } from '@/utils';
import Exceptions from '@/magic/exceptions';

class CRUD<T extends IModel = IModel> {
	protected root: string = '';
	protected serializer = new Serializer();
	protected phantomRecord: IModel | T = {};

	protected getListUrl(): string {
		return this.root;
	}

	protected getRecordUrl(id: (number | string)): string {
		return this.root + id;
	}

	public getPhantomRecord(): IModel | T {
		return this.phantomRecord;
	}

	private buildRequestParameters(parameters?: CRUDGetParameters): object {
		const snakeCased: { [key: string]: string | number } = {};

		Object.entries(parameters as object).forEach(([key, value]) => {
			snakeCased[toSnakeCase(key)] = Array.isArray(value) ? value.join(',') : value;
		});

		return snakeCased;
	}

	public async read(id: number): Promise<T>;
	public async read(parameters?: CRUDPaginationParameters): Promise<CRUDPaginationResponse<T>>;
	public async read(parameters?: CRUDGetParameters): Promise<Array<T>>;
	public async read(arg?: number | CRUDGetParameters | CRUDPaginationParameters) {
		let response: AxiosResponse;

		if(arg != null && isNumber(arg))
			response = await axios.get(this.getRecordUrl(arg));
		else
			response = await axios.get(this.getListUrl(), { params: this.buildRequestParameters(arg) });

		return response.data;
	}

	public async create(data: T): Promise<T> {
		return (await axios.post(this.getListUrl(), this.serializer.toFormData(data))).data;
	}

	public async update(data: T): Promise<T> {
		if(data.id == null)
			throw Exceptions.PhantomRecordUpdating;

		return (await axios.patch(this.getRecordUrl(data.id), this.serializer.toFormData(data))).data;
	}

	public async delete(id: number) {
		await axios.delete(this.getRecordUrl(id));
	}
}

export default CRUD;