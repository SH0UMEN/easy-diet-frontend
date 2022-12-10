export const getCookie = (name: string): string => {
	const cookie = document.cookie;
	const split = cookie.split(`${ name }=`);

	if (split.length == 1)
		throw `Cookie ${ name } is not set`;

	return split[1].split(';')[0];
};

export const debounce = (f: Function, time: number): Function => {
	let timeout: number;

	return (...args: any): void => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			f(...args);
		}, time);
	};
};