import MenuDishRelation from '@/models/menuDishRelation';
import Serializer from '@/serializers/serializer';
import Menu from '@/models/menu';
import { isString } from '@/utils';

class MenuSerializer extends Serializer<Menu> {
	protected excludes = {
		'image': (value: string | File): boolean => isString(value)
	}

	protected serializers = {
		'menuDishRelations': new Serializer<MenuDishRelation>()
	}
}

export default MenuSerializer;