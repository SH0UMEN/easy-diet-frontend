import Product from '@/models/product';

type CRUDGetResponse<T> = {
	results: Array<T>,
	count: number
}

export default CRUDGetResponse;