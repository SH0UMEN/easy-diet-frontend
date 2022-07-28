import { CRUD } from '@/services/crud';
import { defineService } from '@/services/service';
import Product from '@/models/product';
import Urls from "@/magic/urls";

class ProductService extends CRUD<Product> {
	protected root: string = Urls.PRODUCTS;
}

export default defineService(new ProductService());