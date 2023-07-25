import DishSerializer from '@/serializers/dish';
import NutritionValue from '@/types/nutritionValue';
import ScorableService from '@/services/scorable';
import Dish from '@/models/dish';
import URL from '@/magic/url';
import AI from '@/services/ai';

class DishService extends ScorableService<Dish> {
	protected root = URL.Dishes;
	protected serializer = new DishSerializer();
	protected phantomRecord = {
		descriptionShort: '',
		descriptionFull: '',
		dishProductRelations: [],
		overallScore: 0,
		scoresCount: 0,
		userScore: 0,
		title: '',
	};

	private static ModelName = 'dish';
	private static DescriptionShort = 'descriptionShort';
	private static DescriptionFull = 'descriptionFull';

	static getNutritionValue(dish: Dish): NutritionValue {
		const nutritionValue: NutritionValue = {
			kcal: 0,
			kcalFull: 0,
			protein: 0,
			proteinFull: 0,
			fat: 0,
			fatFull: 0,
			carbohydrate: 0,
			carbohydrateFull: 0,
			weight: 0
		};

		for(let relation of dish.dishProductRelations)
			nutritionValue.weight += relation.grams;

		if(nutritionValue.weight == 0)
			return nutritionValue;

		for(let relation of dish.dishProductRelations) {
			nutritionValue.kcal += relation.grams / nutritionValue.weight * relation.product.kcal;
			nutritionValue.kcalFull += (relation.grams / 100) * relation.product.kcal;
			nutritionValue.protein += relation.grams / nutritionValue.weight * relation.product.protein;
			nutritionValue.proteinFull += (relation.grams / 100) * relation.product.protein;
			nutritionValue.carbohydrate += relation.grams / nutritionValue.weight * relation.product.carbohydrate;
			nutritionValue.carbohydrateFull += (relation.grams / 100) * relation.product.carbohydrate;
			nutritionValue.fat += relation.grams / nutritionValue.weight * relation.product.fat;
			nutritionValue.fatFull += (relation.grams / 100) * relation.product.fat;
		}

		return nutritionValue;
	}

	static generateDescriptionShort(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionShort, handler);
	}

	static generateDescriptionFull(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, DishService.ModelName, DishService.DescriptionFull, handler);
	}
}

export default DishService;