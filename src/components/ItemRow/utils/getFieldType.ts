import { isValid } from 'date-fns';
import { EntryFileValue, FIELD_TYPE } from '../../../types';

export const getFieldType = (value: EntryFileValue | undefined) => {
	if (typeof value === 'number') return FIELD_TYPE.NUMBER;
	if (typeof value === 'object' || Array.isArray(value)) return FIELD_TYPE.JSON_LIKE_VALUE;
	if (typeof value === 'boolean') return FIELD_TYPE.BOOLEAN;
	if (typeof value !== 'string') return FIELD_TYPE.UNKNOWN;

	// KISS
	if (value.match(/^\S+@\S+\.\S+$/g)) return FIELD_TYPE.EMAIL;

	try {
		if (isValid(new Date(value))) return FIELD_TYPE.DATE;
		if (isValid(new Date(value.slice(0, '0000-00-00T00:00:00'.length)))) return FIELD_TYPE.DATE;
	// eslint-disable-next-line no-empty
	} catch (e) {}
	if (value.length >= 100) return FIELD_TYPE.LONG_TEXT;

	return FIELD_TYPE.TEXT;
};
