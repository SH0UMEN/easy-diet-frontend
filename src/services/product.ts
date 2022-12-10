import { CRUD } from '@/services/crud';
import Product from '@/models/product';
import URL from '@/magic/url';

export default class ProductService extends CRUD<Product> {
	protected root: string = URL.PRODUCTS;
}