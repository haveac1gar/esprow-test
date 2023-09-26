import { format, isValid } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export const getDateUIValue = (value: string): string => {
	try {
		if (isValid(new Date(value))) return value;
		return format(
			zonedTimeToUtc(String(value.slice(0, '0000-00-00T00:00:00'.length)), String(value).split(' ')[1]).getTime(),
			'yyyy-MM-dd',
		);
	} catch (e) {
		return value;
	}
};
export const getDateStoredValue = (value: string) => {
	try {
		return format(new Date(value).getTime(), "yyyy-MM-dd'T'HH:mm:ss xxx");
	} catch (e) {
		return value;
	}
};
