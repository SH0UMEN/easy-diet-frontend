import CRUDGetParameters from '@/types/CRUDGetParameters';

type CRUDPaginationParameters = CRUDGetParameters & {
	limit?: number,
	offset?: number
}

export default CRUDPaginationParameters;