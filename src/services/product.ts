import { CRUD } from '@/services/crud';
import Product from '@/models/product';
import { defineService } from "@/utils";
import Urls from "@/magic/urls";

class ProductService extends CRUD<Product> {
	protected root: string = Urls.PRODUCTS;
}

export default defineService(new ProductService());