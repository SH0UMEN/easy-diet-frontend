import I18N from "@/models/i18n";

interface IProductI18N {
	title: string;
}

export default interface IProduct {
	id: number;
	i18n: I18N<IProductI18N>;
	carbohydrate: number;
	protein: number;
	fat: number;
	kcal: number;
	category: number;
}