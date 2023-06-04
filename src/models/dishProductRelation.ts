import Product from '@/models/product';
import IModel from '@/models/model';

interface DishProductRelation extends IModel {
	product: Product;
	grams: number;
}

export default DishProductRelation;