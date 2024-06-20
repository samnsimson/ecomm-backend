export const base64encode = (key: any) => {
	return key ? Buffer.from(key).toString('base64') : key;
};

export const base64decode = (key: any) => {
	return key ? Buffer.from(key, 'base64').toString('utf-8') : key;
};
