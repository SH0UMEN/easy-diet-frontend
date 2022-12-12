import IModel from '@/models/model';
import DishProductRelation from '@/models/dish-product-relation';

interface Dish extends IModel {
	dishProductRelations: Array<DishProductRelation>;
	image: File | string | null;
	author?: string;
	title: string;
}

export default Dish;