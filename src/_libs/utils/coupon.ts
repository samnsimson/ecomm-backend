import { isAfter, isWithinInterval } from 'date-fns';

export const couponIsWithinRange = (now: Date, from: Date | string | null, to: Date | string | null) => {
	if (!from && !to) return true;
	if (isWithinInterval(now, { start: new Date(from), end: new Date(to) })) return true;
	if (isAfter(now, new Date(from)) && to === null) return true;
	return false;
};
