export const getCacheKey = (baseKey: string, ...args: Array<string | Record<any, any>>) => {
	args = args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg)));
	return `${baseKey}:${args.join(':')}`;
};
