import NutritionValue from '@/types/nutritionValue';
import ScorableService from '@/services/scorable';
import MenuSerializer from '@/serializers/menu';
import DishService from '@/services/dish';
import Menu from '@/models/menu';
import AI from '@/services/ai';
import URL from '@/magic/url';

class MenuService extends ScorableService<Menu> {
	protected root = URL.Menus;
	protected serializer = new MenuSerializer();
	protected phantomRecord = {
		menuDishRelations: [],
		overallScore: 0,
		scoresCount: 0,
		userScore: 0,
		title: ''
	};

	private static ModelName = 'menu';
	private static DescriptionShort = 'descriptionShort';
	private static DescriptionFull = 'descriptionFull';

	public static getNutritionValue(menu: Menu): NutritionValue {
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

		const dishValues: Array<NutritionValue> = [];

		for(let relation of menu.menuDishRelations) {
			let dishValue = DishService.getNutritionValue(relation.dish);
			dishValues.push(dishValue);

			nutritionValue.weight += dishValue.weight * relation.quantity;
		}

		if(nutritionValue.weight == 0)
			return nutritionValue;

		for(let i = 0; i < menu.menuDishRelations.length; i++) {
			let relation = menu.menuDishRelations[i];
			let dishValue = dishValues[i];
			let fullWeight = dishValue.weight * relation.quantity;

			nutritionValue.kcalFull += dishValue.kcalFull * relation.quantity;
			nutritionValue.kcal += fullWeight / nutritionValue.weight * dishValue.kcal;
			nutritionValue.proteinFull += dishValue.proteinFull * relation.quantity;
			nutritionValue.protein += fullWeight / nutritionValue.weight * dishValue.protein;
			nutritionValue.carbohydrateFull += dishValue.carbohydrateFull * relation.quantity;
			nutritionValue.carbohydrate += fullWeight / nutritionValue.weight * dishValue.carbohydrate;
			nutritionValue.fatFull += dishValue.fatFull * relation.quantity;
			nutritionValue.fat += fullWeight / nutritionValue.weight * dishValue.fat;
		}

		return nutritionValue;
	}

	public static generateDescriptionShort(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, MenuService.ModelName, MenuService.DescriptionShort, handler);
	}

	public static generateDescriptionFull(title: string, ingredients: Array<number>, handler: Function) {
		AI.generate(title, ingredients, MenuService.ModelName, MenuService.DescriptionFull, handler);
	}
}

export default MenuService;