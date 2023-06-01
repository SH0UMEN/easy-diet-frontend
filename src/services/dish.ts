import DishSerializer from '@/serializers/dish';
import CRUD from '@/services/crud';
import Dish from '@/models/dish';
import URL from '@/magic/url';
import AI from '@/services/ai';

class DishService extends CRUD<Dish> {
	protected root = URL.Dishes;
	protected serializer = new DishSerializer();
	protected phantomRecord = { title: '', descriptionShort: '', descriptionFull: '', dishProductRelations: [] };

	private static ModelName = 'dish';
	private static DescriptionShort = 'descriptionShort';
	private static DescriptionFull = 'descriptionFull';
	private static Image = 'image';

	public static generateDescriptionShort(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionShort, handler);
	}

	public static generateDescriptionFull(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionFull, handler);
	}
}

export default DishService;