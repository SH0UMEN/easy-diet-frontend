import Product from '@/models/product';

type CRUDPaginationResponse<T> = {
	results: Array<T>,
	count: number
}

export default CRUDPaginationResponse;