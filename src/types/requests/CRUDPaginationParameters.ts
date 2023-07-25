import CRUDGetParameters from '@/types/requests/CRUDGetParameters';

type CRUDPaginationParameters = CRUDGetParameters & {
	limit?: number;
	offset?: number;
}

export default CRUDPaginationParameters;