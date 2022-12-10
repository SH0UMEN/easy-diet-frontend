import Product from '@/models/product';

type DishProduct = {
	product: Product,
	dish: number,
	grams: number
}

export default DishProduct;