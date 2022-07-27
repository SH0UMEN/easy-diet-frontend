import Service from "@/services/service";

export const getCookie = (name: string): string => {
	const cookie = document.cookie;
	const split = cookie.split(`${ name }=`);

	if(split.length == 1)
		throw `Cookie ${ name } is not set`;

	return split[1].split(';')[0];
};

export const defineService = (service: Service): Function => {
	return () => service;
}