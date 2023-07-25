import Exceptions from '@/magic/exceptions';
import IModel from '@/models/model';
import CRUD from '@/services/crud';
import axios from 'axios';

class ScorableService<T extends IModel = IModel> extends CRUD<T> {
	public async rate(record: T, score: number): Promise<T> {
		if(record.id == null)
			throw Exceptions.PhantomRecordUpdating;

		const route = this.getRecordUrl(record.id) + '/rate';
		const data = new FormData();
		data.set('score', score.toString());

		return (await axios.patch(route, data)).data;
	}
}

export default ScorableService;