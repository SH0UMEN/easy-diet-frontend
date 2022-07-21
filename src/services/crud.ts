import axios from "axios";

export class CRUD<T> {
	protected root: string = '';

	protected getListUrl(): string {
		return this.root;
	}

	protected getDetailsUrl(id: (number | string)): string {
		return this.root + id;
	}

	async get(): Promise<Array<T>>;
	async get(id: number): Promise<T>;
	async get(arg?: number) {
		const url = arg == null ? this.getListUrl() : this.getDetailsUrl(arg);

		return (await axios.get(url)).data;
	}
}