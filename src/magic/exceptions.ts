const Exceptions = {
	PhantomRecordUpdating: 'Trying to update a phantom record'
} as const;

type Exceptions = typeof Exceptions[keyof typeof Exceptions];

export default Exceptions;