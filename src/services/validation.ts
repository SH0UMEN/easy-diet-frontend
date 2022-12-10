import { ComposerTranslation } from 'vue-i18n';

class ValidationService {
	static username(t: ComposerTranslation): Array<Function> {
		return [
			ValidationService.required(t),
			ValidationService.moreThanOrEqualTo(t, 5),
			ValidationService.lessThanOrEqualTo(t, 16)
		];
	}

	static password(t: ComposerTranslation): Array<Function> {
		return [
			ValidationService.required(t),
			ValidationService.moreThanOrEqualTo(t, 6),
			ValidationService.lessThanOrEqualTo(t, 20)
		];
	}

	private static required(t: ComposerTranslation): Function {
		return (v: string) => v != '' || t('form.required')
	}

	private static lessThanOrEqualTo(t: ComposerTranslation, max: number): Function {
		return (v: string) => v.length <= max || t('form.lessThanOrEqualTo', { max: max });
	}

	private static moreThanOrEqualTo(t: ComposerTranslation, min: number): Function {
		return (v: string) => v.length >= min ||  t('form.moreThanOrEqualTo', { min: min });
	}
}

export default ValidationService;