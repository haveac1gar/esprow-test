import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

type EntryElementRaw = {
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
type EntryElement = EntryElementRaw & {
  idx: number;
};

export type EntryFileRaw = EntryElementRaw[];
export type EntryFile = EntryElement[];
export type EntryField= keyof EntryElement;

const EntryFileDefault = [] as EntryFile;
const EntryFile = createContext(EntryFileDefault);
const SetEntryFile = createContext((_a: EntryFile) => {});

const EntryFileFieldsDefault = [] as EntryField[];
const EntryFileFields = createContext(EntryFileFieldsDefault);
const SetEntryFileFields = createContext((_a: EntryField[]) => {});

// I'd prefer Recoil instead, but it's also doable with Context
export const EntryFileProvider = (props: PropsWithChildren) => {
  const [entryFile, setEntryFile] = useState(EntryFileDefault);
  const [entryFields, setEntryFields] = useState(EntryFileFieldsDefault);

  return (
    <EntryFile.Provider value={entryFile}>
      <SetEntryFile.Provider value={setEntryFile}>
        <EntryFileFields.Provider value={entryFields}>
          <SetEntryFileFields.Provider value={setEntryFields}>
            {props.children}
          </SetEntryFileFields.Provider>
        </EntryFileFields.Provider>
      </SetEntryFile.Provider>
    </EntryFile.Provider>
  )
}

export const useSetEntryFile = () => {
  const setEntryFile = useContext(SetEntryFile);
  const setEntryFileFields = useContext(SetEntryFileFields);

  return useCallback((data: EntryFileRaw) => {
    setEntryFile(data.map((el, idx) => ({ ...el, idx })));

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
export const useEntryFileFields = () => useContext(EntryFileFields);