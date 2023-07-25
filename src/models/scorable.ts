import IModel from '@/models/model';

interface Scorable extends IModel {
	userScore: number;
	scoresCount: number;
	overallScore: number;
}

export default Scorable;