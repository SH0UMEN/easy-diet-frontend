import axios from "axios";
import { CRUD } from '@/services/crud';
import IProduct from '@/models/product';
import { defineService } from "@/utils";
import Urls from "@/magic/urls";

class ProductService extends CRUD<IProduct> {
	protected root: string = Urls.PRODUCTS;
}

export default defineService(new ProductService());