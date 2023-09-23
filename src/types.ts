import { StrictOmit } from 'ts-essentials';

export type EntryFileRow = {
  id: string;
  isActive: boolean;
  picture: string;
  age: number;
  name: string;
  email: string;
  address: string;
  about: string;
  registered: string;
};

export type EntryFile = EntryFileRow[];

export type EntryFileRowUI = StrictOmit<EntryFileRow, 'id'>;
export type EntryFileUI = EntryFileRowUI[];

export enum OPEN_FILE_PROGRESS {
  PENDING = 'PENDING',
  OPENING = 'OPENING',
  ERROR = 'ERROR',
  OPEN = 'OPEN'
}

export enum FIELD_TYPE {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  EMAIL = 'EMAIL',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  TEXTAREA = 'TEXTAREA',
}
