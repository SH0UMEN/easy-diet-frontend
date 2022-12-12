import DishProductRelation from '@/models/dish-product-relation';
import Serializer from '@/serializers/serializer';
import Dish from '@/models/dish';

class DishSerializer extends Serializer<Dish> {
	protected serializers = {
		'dishProductRelations': new Serializer<DishProductRelation>()
	}
}

export default DishSerializer;