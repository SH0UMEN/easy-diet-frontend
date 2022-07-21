import axios from "axios";
import { RestAPI } from '@/services/rest';
import IProduct from '@/models/product';
import Urls from "@/services/urls";

export default class ProductAPI extends RestAPI<IProduct> {
	protected root: string = Urls.PRODUCTS;
}