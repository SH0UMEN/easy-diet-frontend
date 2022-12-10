import I18N from '@/models/i18n';
import IModel from '@/models/model';

interface ProductI18N extends IModel {
	title: string;
}

interface Product extends IModel {
	i18n: I18N<ProductI18N>;
	carbohydrate: number;
	protein: number;
	fat: number;
	kcal: number;
	category: number;
}

export default Product;