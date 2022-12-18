const Error = {
	UserIsAuthenticated: 1,
	UsernameIsBusy: 2,
	UserNotFound: 3,
	DataNotValid: 4
} as const;

type Error = typeof Error[keyof typeof Error];

export default Error;