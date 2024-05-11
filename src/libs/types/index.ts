export type FindByArgs<T> = {
	[K in keyof T]?: T[K] extends object ? FindByArgs<T[K]> : T[K];
};
