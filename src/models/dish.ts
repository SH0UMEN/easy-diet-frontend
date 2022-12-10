import IModel from '@/models/model';
import DishProductRelation from '@/models/dish-product-relation';

interface Dish extends IModel {
	dishProductRelations: Array<DishProductRelation>;
	author?: string;
	image?: string;
	title: string;
}

export default Dish;