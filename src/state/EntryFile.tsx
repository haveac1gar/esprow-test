import React, {
	PropsWithChildren, createContext, useCallback, useContext, useState,
} from 'react';
import { noop } from '../utils';

type EntryElement = {
  id: string;
  isActive: boolean;
  picture: string;
  age: number;
  name: string;
  email: string;
  address: string;
  about: string;
  registered: string;
}

export type EntryFileType = EntryElement[];
export type EntryField = keyof EntryElement;

const EntryFileDefault = [] as EntryFileType;
const EntryFile = createContext(EntryFileDefault);
const SetEntryFile = createContext(noop as (a: EntryFileType) => void);

const EntryFileFieldsDefault = [] as EntryField[];
const EntryFileFields = createContext(EntryFileFieldsDefault);
const SetEntryFileFields = createContext(noop as (a: EntryField[]) => void);

// I'd prefer Recoil instead, but it's also doable with Context
export const EntryFileProvider = ({ children }: PropsWithChildren) => {
	const [entryFile, setEntryFile] = useState(EntryFileDefault);
	const [entryFields, setEntryFields] = useState(EntryFileFieldsDefault);

	return (
		<EntryFile.Provider value={entryFile}>
			<SetEntryFile.Provider value={setEntryFile}>
				<EntryFileFields.Provider value={entryFields}>
					<SetEntryFileFields.Provider value={setEntryFields}>
						{children}
					</SetEntryFileFields.Provider>
				</EntryFileFields.Provider>
			</SetEntryFile.Provider>
		</EntryFile.Provider>
	);
};

export const useSetEntryFile = () => {
	const setEntryFile = useContext(SetEntryFile);
	const setEntryFileFields = useContext(SetEntryFileFields);

	return useCallback((data: EntryFileType) => {
		if (!Array.isArray(data)) throw Error('JSON is not an array');
		setEntryFile(data);

		const columns = new Set<EntryField>();

		for (const el of data) {
			for (const key of Object.keys(el)) {
				const keyWithType = key as EntryField;
				columns.add(keyWithType);
			}
		}

		setEntryFileFields([...columns.keys()]);
	}, [setEntryFile, setEntryFileFields]);
};

export const useEntryFile = () => useContext(EntryFile);
export const useEntryFileFields = () => useContext(EntryFileFields).filter(field => field !== 'id');
