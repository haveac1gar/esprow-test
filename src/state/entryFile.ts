import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import {
	EntryFile, EntryFileMap, EntryFileRowUI, ItemId,
} from '../types';
import { RootState } from './store';

type EntryFileState = {
	arr: EntryFile,
	map: EntryFileMap,
	name: string | null;
};
const initialState: EntryFileState = {
	arr: [],
	map: {},
	name: null,
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

			for (const item of state.arr) {
				state.map[item.id] = item;
			}
		},
		sortBy: (
			state,
			action: PayloadAction<{ type: 'ASC' | 'DESC', field: keyof EntryFileRowUI }>,
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
				name: keyof EntryFileRowUI,
				value: EntryFileRowUI[keyof EntryFileRowUI]
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
	(_state: RootState, _name: keyof EntryFileRowUI, id: ItemId) => id,
	(_state: RootState, name: keyof EntryFileRowUI, _id: ItemId) => name,
	(map, id, name) => {
		const item = map[id];

		if (!item) return undefined;

		return item[name];
	}
);
