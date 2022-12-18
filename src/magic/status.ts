const Status = {
	OK: 200,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFound: 404
} as const;

type Status = typeof Status[keyof typeof Status];

export default Status;