import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { OPEN_FILE_PROGRESS } from '../types';
import { RootState } from './store';

const initialState: {
	status: OPEN_FILE_PROGRESS,
} = {
	status: OPEN_FILE_PROGRESS.PENDING,
};

const openFileProgressSlice = createSlice({
	name: 'openFileProgress',
	initialState,
	reducers: {
		setProgress: (state, action: PayloadAction<OPEN_FILE_PROGRESS>) => {
			state.status = action.payload;
		},
	},
});

export const { setProgress } = openFileProgressSlice.actions;
export default openFileProgressSlice.reducer;

export const openFileProgressSelector = createSelector(
	(state: RootState) => state.openFileProgress.status,
	status => status,
);
