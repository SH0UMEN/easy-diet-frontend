import CRUD from '@/services/crud';
import Product from '@/models/product';
import URL from '@/magic/url';

class ProductService extends CRUD<Product> {
	protected root: string = URL.Products;
}

export default ProductService;