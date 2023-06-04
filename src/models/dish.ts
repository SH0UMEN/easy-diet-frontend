import DishProductRelation from '@/models/dishProductRelation';
import IModel from '@/models/model';
import User from '@/models/user';

interface Dish extends IModel {
	dishProductRelations: Array<DishProductRelation>;
	image?: File | string;
	descriptionShort?: string;
	descriptionFull?: string;
	author?: User;
	title: string;
}

export default Dish;