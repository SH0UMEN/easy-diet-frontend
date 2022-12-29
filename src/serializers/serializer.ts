import IModel from '@/models/model';

type SerializerFields = { [field: string]: Serializer };

class Serializer<T extends IModel = IModel> {
	protected serializers: SerializerFields = {};

	public toFormData(source: T): FormData {
		const json = this.linearize(this.serialize(source));
		const result = new FormData();

		for(let key in json)
			result.set(key, json[key]);

		return result;
	}

	public linearize(source: any): any;
	public linearize(source: Array<any>): Array<any>;
	public linearize(source: Array<any> | any) {
		const isSourceArray = source instanceof Array;
		const result: any = {};

		for(let key in source) {
			let value = source[key];
			let isValueArray = value instanceof Array;

			if(isSourceArray)
				key = '[' + key + ']';
			if(typeof value != 'object' || value instanceof Blob) {
				result[key] = value;
				continue;
			}

			value = this.linearize(value);

			for(let nestedKey in value)
				result[key + (!(isSourceArray || isValueArray) ? '.' : '') + nestedKey] = value[nestedKey];
		}

		return result;
	}

	public serialize(source: T): any;
	public serialize(source: Array<T>): Array<any>;
	public serialize(source: Array<T> | T) {
		if(source instanceof Array)
			return source.map((item) => this.serialize(item));

		const result: any = {};
		const entries = Object.entries(source);

		for(let i = 0; i < entries.length; i++) {
			let key = entries[i][0];
			let value = entries[i][1];

			if(value == undefined)
				continue;
			if(key in this.serializers)
				result[key] = this.serializers[key].serialize(value);
			else if(typeof value == 'object' && !(value instanceof Blob))
				result[key] = value.id;
			else
				result[key] = value;
		}

		return result;
	}
}

export default Serializer;