import React, { PropsWithChildren } from 'react';
import { EntryFileProvider } from './EntryFile';
import { OpenFileProgressProvider } from './OpenFileProgress';

export const StateProvider = ({ children }: PropsWithChildren) => {
	return (
		<EntryFileProvider>
			<OpenFileProgressProvider>
				{children}
			</OpenFileProgressProvider>
		</EntryFileProvider>
	);
};
