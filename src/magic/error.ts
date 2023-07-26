const Error = {
	UserIsAuthenticated: 1,
	UserIsNotActive: 2,
	UsernameIsBusy: 3,
	UserNotFound: 4,
	DataNotValid: 5
} as const;

type Error = typeof Error[keyof typeof Error];

export default Error;