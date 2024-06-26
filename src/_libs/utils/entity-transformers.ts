import { startOfDay, endOfDay } from 'date-fns';

export const dateTransformer = {
	to: (value: Date) => value,
	from: (value: string) => {
		if (!value) return null;
		const date = new Date(value);
		return date;
	},
};

export const startOfDayTransformer = {
	to: (value: Date) => value,
	from: (value: string) => {
		if (!value) return null;
		return startOfDay(new Date(value));
	},
};

export const endOfDayTransformer = {
	to: (value: Date) => value,
	from: (value: string) => {
		if (!value) return null;
		return endOfDay(new Date(value));
	},
};
