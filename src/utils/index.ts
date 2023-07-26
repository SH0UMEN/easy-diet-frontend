import { computed } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

export const getCookie = (name: string): string => {
	const cookie = document.cookie;
	const split = cookie.split(`${ name }=`);

	if (split.length == 1)
		throw `Cookie ${ name } is not set`;

	return split[1].split(';')[0];
};

export const debounce = (f: Function, time: number) => {
	let timeout: number;

	return (...args: any): void => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			f(...args);
		}, time);
	};
};

export const wrapModel = <T, P>(props: Readonly<any>, emit: Function, name: string = 'modelValue') => {
	return computed<T>({
		get: () => props[name],
		set: (value: T) => emit(`update:${name}`, value)
	})
};

export const getImageDataUrl = async (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

export const isString = (value: any): value is string => {
	return typeof value == 'string' || value instanceof String;
};

export const isNumber = (value: any): value is number => {
	return typeof value == 'number' && !isNaN(value) || value instanceof Number;
};

export const isObject = (value: any): value is Object => {
	return typeof value == 'object';
};

export const passQueryData = (name: string, toInt: boolean) => {
	return (route: RouteLocationNormalized) => {
		const param = route.params[name];
		const result: { [field: string]: number | string | string[] } = {};

		if(toInt)
			result[name] = param instanceof Array ? param : parseInt(param);
		else
			result[name] = param;

		return result;
	}
};

export const toSnakeCase = (value: string): string => {
	return value.replace(/[A-Z]/g, (letter) => '_' + letter.toLowerCase());
};