import axios from "axios";
import { CRUD } from '@/services/crud';
import IProduct from '@/models/product';
import Urls from "@/services/urls";

export default class ProductService extends CRUD<IProduct> {
	protected root: string = Urls.PRODUCTS;
}