import React, {
	PropsWithChildren, createContext, useContext, useState,
} from 'react';
import { noop } from '../utils';
import { type EntryFile as EntryFileType } from '../types';

const EntryFileInit: EntryFileType = [];
const EntryFile = createContext(EntryFileInit);
const SetEntryFileState = createContext(noop as (_a: EntryFileType) => void);

export const EntryFileProvider = ({ children }: PropsWithChildren) => {
	const [entryFile, setEntryFile] = useState(EntryFileInit);

	return (
		<EntryFile.Provider value={entryFile}>
			<SetEntryFileState.Provider value={setEntryFile}>
				{children}
			</SetEntryFileState.Provider>
		</EntryFile.Provider>
	);
};

export const useEntryFile = () => useContext(EntryFile);
export const useSetEntryFile = () => useContext(SetEntryFileState);
