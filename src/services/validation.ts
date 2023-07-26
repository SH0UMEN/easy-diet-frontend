import { ComposerTranslation } from 'vue-i18n';
import { isString } from '@/utils';

class ValidationService {
	public static username(t: ComposerTranslation): Array<Function> {
		return [
			ValidationService.required(t),
			ValidationService.moreThanOrEqualTo(t, 5),
			ValidationService.lessThanOrEqualTo(t, 16)
		];
	}

	public static password(t: ComposerTranslation): Array<Function> {
		return [
			ValidationService.required(t),
			ValidationService.moreThanOrEqualTo(t, 6),
			ValidationService.lessThanOrEqualTo(t, 20)
		];
	}

	public static email(t: ComposerTranslation): Array<Function> {
		return [(v: string) => {
			const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(v) || t('form.email');
		}];
	}

	public static required(t: ComposerTranslation): Function {
		return (v: string | number) => v !== '' || t('form.required');
	}

	public static requiredFile(t: ComposerTranslation): Function {
		return (v: Array<Blob>) => v.length > 0 || t('form.required');
	}

	public static lessThanOrEqualTo(t: ComposerTranslation, max: number): Function {
		return (v: string | number) => {
			const value = isString(v) ? v.length : v;
			return value <= max || t('form.' + (typeof v) + '.lessThanOrEqualTo', { max: max });
		};
	}

	public static moreThanOrEqualTo(t: ComposerTranslation, min: number): Function {
		return (v: string | number) => {
			const value = isString(v) ? v.length : v;
			return value >= min || t('form.' + (typeof v) + '.moreThanOrEqualTo', { min: min });
		};
	}
}

export default ValidationService;