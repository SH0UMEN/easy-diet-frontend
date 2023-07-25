import MenuDishRelation from '@/models/menuDishRelation';
import Scorable from '@/models/scorable';
import User from '@/models/user';

interface Menu extends Scorable {
	menuDishRelations: Array<MenuDishRelation>;
	image?: File | string;
	descriptionShort?: string;
	descriptionFull?: string;
	author?: User;
	title: string;
}

export default Menu;