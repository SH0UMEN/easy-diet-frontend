import axios from "axios";

export class RestAPI<T> {
	protected root: string = '';

	async get(): Promise<Array<T>> {
		const response = await axios.get(this.root);
		return response.data;
	}
}