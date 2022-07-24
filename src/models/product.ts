import I18N from "@/models/i18n";

type ProductI18N = {
	title: string;
}

type Product = {
	id: number;
	i18n: I18N<ProductI18N>;
	carbohydrate: number;
	protein: number;
	fat: number;
	kcal: number;
	category: number;
}

export default Product;