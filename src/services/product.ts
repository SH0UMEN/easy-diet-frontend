import { CRUD } from '@/services/crud';
import { defineService } from '@/services/service';
import Product from '@/models/product';
import URL from '@/magic/url';

class ProductService extends CRUD<Product> {
	protected root: string = URL.PRODUCTS;
}

export default defineService(new ProductService());