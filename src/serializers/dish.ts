import DishProductSerializer from '@/serializers/dish-product-relation';
import Serializer from '@/serializers/serializer';
import Dish from '@/models/dish';

class DishSerializer extends Serializer<Dish> {
	protected serializers = {
		'dishProductRelations': new DishProductSerializer()
	}
}

export default DishSerializer;