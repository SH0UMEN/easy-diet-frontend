import IModel from '@/models/model';
import Dish from '@/models/dish';

interface MenuDishRelation extends IModel {
	dish: Dish;
	quantity: number;
}

export default MenuDishRelation;