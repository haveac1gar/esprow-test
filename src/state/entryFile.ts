import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import {
	EntryFile, EntryFileMap, EntryFileValue, ItemId,
} from '../types';
import { RootState } from './store';
import { uniqueId } from 'lodash';

type EntryFileState = {
	arr: EntryFile,
	map: EntryFileMap,
	name: string | null;
	fieldNames: string[]
};
const initialState: EntryFileState = {
	arr: [],
	map: {},
	name: null,
	fieldNames: [],
};

const entryFileSlice = createSlice({
	name: 'entryFile',
	initialState,
	reducers: {
		loadFile: (
			state,
			action: PayloadAction<{ data: EntryFile, filename: string }>,
		) => {
			state.name = action.payload.filename;
			state.arr = action.payload.data;
			state.map = {};

			const fieldNamesSet = new Set<string>();

			for (const item of state.arr) {
				// Assuming all valid files should contain id field
				// If id is not occured, generating it - it is still important for performance
				if (Object.prototype.hasOwnProperty.call(item, 'id')) {
					const id = item.id as ItemId;
					state.map[id] = item;
				} else {
					const id = uniqueId() as ItemId;
					item.id = id;
					state.map[id] = item;
				}

				for (const fieldName of Object.keys(item)) {
					fieldNamesSet.add(fieldName);
				}
			}

			state.fieldNames = [...fieldNamesSet.values()];
		},
		sortBy: (
			state,
			action: PayloadAction<{ type: 'ASC' | 'DESC', field: string }>,
		) => {
			const { type, field } = action.payload;
			state.arr = state.arr.sort((a, b) => {
				if (
					typeof a !== typeof b ||
					a[field] === b[field]
				) return 0;

				if (typeof a === 'boolean') {
					if (type === 'ASC') return Number(a[field]) - Number(b[field]);

					return Number(a[field]) - Number(b[field]);
				}

				if (type === 'ASC') return a[field] > b[field] ? 1 : -1;

				return b[field] > a[field] ? 1 : -1;
			});
		},
		updateField: (
			state,
			action: PayloadAction<{
				id: ItemId,
				name: string,
				value: EntryFileValue,
			}>
		) => {
			const { id, name, value } = action.payload;
			const itemIndex = state.arr.findIndex(el => el.id === id);
			const item = state.arr[itemIndex];

			if (!item) return;

			const newItem = {
				...item,
				[name]: value,
			};

			state.arr[itemIndex] = newItem;
			state.map[id] = newItem;
		},
	},
});

export const { loadFile, sortBy, updateField } = entryFileSlice.actions;
export default entryFileSlice.reducer;

export const itemFieldSelector = createSelector(
	(state: RootState) => state.entryFile.map,
	(_state: RootState, _name: string, id: ItemId) => id,
	(_state: RootState, name: string, _id: ItemId) => name,
	(map, id, name) => {
		const item = map[id];

		if (!item) return undefined;

		return item[name];
	}
);
