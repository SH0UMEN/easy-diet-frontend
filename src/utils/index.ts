export const getCookie = (name: string): string => {
	const cookie = document.cookie;
	const split = cookie.split(`${ name }=`);

	if(split.length == 1)
		throw `Cookie ${ name } is not set`;

	return split[1].split(';')[0];
}