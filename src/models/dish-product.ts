import Product from '@/models/product';
import IModel from '@/models/model';

interface DishProduct extends IModel {
	product: Product;
	grams: number;
}

export default DishProduct;