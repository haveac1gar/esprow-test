import React, { PropsWithChildren } from 'react';
import { LoadingStateProvider } from './LoadingState';
import { EntryFileProvider } from './EntryFile';

export {
	useSetEntryFile, useEntryFile, useEntryFileFields, type EntryFileType,
} from './EntryFile';
export { useSetLoadingState, useLoadingState, LoadingStatus } from './LoadingState';

export const Context = ({ children }: PropsWithChildren) => {
	return (
		<LoadingStateProvider>
			<EntryFileProvider>
				{children}
			</EntryFileProvider>
		</LoadingStateProvider>
	);
};
