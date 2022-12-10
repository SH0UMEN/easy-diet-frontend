import IModel from '@/models/model';

interface I18N<T> extends IModel {
	ru: T;
	en: T;
}

export default I18N;