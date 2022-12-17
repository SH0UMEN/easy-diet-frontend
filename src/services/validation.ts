import { ComposerTranslation } from 'vue-i18n';

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

	public static required(t: ComposerTranslation): Function {
		return (v: string) => v != '' || t('form.required');
	}

	public static requiredFile(t: ComposerTranslation): Function {
		return (v: Array<Blob>) => v.length > 0 || t('form.required');
	}

	public static lessThanOrEqualTo(t: ComposerTranslation, max: number): Function {
		return (v: string) => v.length <= max || t('form.lessThanOrEqualTo', { max: max });
	}

	public static moreThanOrEqualTo(t: ComposerTranslation, min: number): Function {
		return (v: string) => v.length >= min ||  t('form.moreThanOrEqualTo', { min: min });
	}
}

export default ValidationService;