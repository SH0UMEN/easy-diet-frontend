import IModel from '@/models/model';

type SerializerFields = { [field: string]: Serializer };

class Serializer<T extends IModel = IModel> {
	protected serializers: SerializerFields = {};

	public serialize(source: T): any {
		const result: any = {};
		const entries = Object.entries(source);

		for(let i = 0; i < entries.length; i++) {
			let key = entries[i][0];
			let value = entries[i][1];

			if(key in this.serializers)
				result[key] = this.serializers[key].serialize(value);
			else if(typeof value == 'object')
				result[key] = value.id;
			else
				result[key] = value;
		}

		return result;
	}
}

export default Serializer;