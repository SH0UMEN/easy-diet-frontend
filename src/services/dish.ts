import DishSerializer from '@/serializers/dish';
import CRUD from '@/services/crud';
import Dish from '@/models/dish';
import URL from '@/magic/url';
import AI from '@/services/ai';
import NutritionValue from '@/types/nutritionValue';

class DishService extends CRUD<Dish> {
	protected root = URL.Dishes;
	protected serializer = new DishSerializer();
	protected phantomRecord = { title: '', descriptionShort: '', descriptionFull: '', dishProductRelations: [] };

	private static ModelName = 'dish';
	private static DescriptionShort = 'descriptionShort';
	private static DescriptionFull = 'descriptionFull';

	public static getNutritionValue(dish: Dish): NutritionValue {
		const nutritionValue: NutritionValue = {
			kcal: 0,
			protein: 0,
			fat: 0,
			carbohydrate: 0
		};

		let weight = 0;
		for(let relation of dish.dishProductRelations)
			weight += relation.grams;

		if(weight == 0)
			return nutritionValue;

		for(let relation of dish.dishProductRelations) {
			nutritionValue['kcal'] += relation.grams / weight * relation.product['kcal'];
			nutritionValue['protein'] += relation.grams / weight * relation.product['protein'];
			nutritionValue['carbohydrate'] += relation.grams / weight * relation.product['carbohydrate'];
			nutritionValue['fat'] += relation.grams / weight * relation.product['fat'];
		}

		return nutritionValue;
	}

	public static generateDescriptionShort(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionShort, handler);
	}

	public static generateDescriptionFull(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionFull, handler);
	}
}

export default DishService;