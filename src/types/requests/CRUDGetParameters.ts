import FilterParameters from '@/types/requests/FilterParameters';

type CRUDGetParameters = FilterParameters & {
	category?: number;
	author?: number;
	search?: string;
	lang?: string;
}

export default CRUDGetParameters;