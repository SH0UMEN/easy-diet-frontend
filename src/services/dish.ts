import DishSerializer from '@/serializers/dish';
import CRUD from '@/services/crud';
import Dish from '@/models/dish';
import URL from '@/magic/url';

class DishService extends CRUD<Dish> {
	protected root = URL.Dishes;
	protected serializer = new DishSerializer();
	protected phantomRecord = { title: '', descriptionShort: '', descriptionFull: '', dishProductRelations: [] };
}

export default DishService;