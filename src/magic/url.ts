const URL = {
	GPT: '/api/ai/text',
	Products: '/api/products/',
	Dishes: '/api/dishes/',
	Auth: '/api/auth/'
} as const;

type URL = typeof URL[keyof typeof URL];

export default URL;