import DishProductRelation from '@/models/dishProductRelation';
import Scorable from '@/models/scorable';
import User from '@/models/user';

interface Dish extends Scorable {
	dishProductRelations: Array<DishProductRelation>;
	image?: File | string;
	descriptionShort?: string;
	descriptionFull?: string;
	author?: User;
	title: string;
}

export default Dish;