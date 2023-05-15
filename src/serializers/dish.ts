import DishProductRelation from '@/models/dish-product-relation';
import Serializer from '@/serializers/serializer';
import Dish from '@/models/dish';
import { isString } from '@/utils';

class DishSerializer extends Serializer<Dish> {
	protected excludes = {
		'image': (value: string | File): boolean => isString(value)
	}

	protected serializers = {
		'dishProductRelations': new Serializer<DishProductRelation>()
	}
}

export default DishSerializer;