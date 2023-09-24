import { Opaque, StrictOmit } from 'ts-essentials';

export type ItemId = Opaque<string, 'ItemId'>;
export type EntryFileRow = {
  id: ItemId;
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
export type EntryFileMap = Record<ItemId, EntryFileRow>;

export type EntryFileRowUI = StrictOmit<EntryFileRow, 'id'>;
export type EntryFileUI = EntryFileRowUI[];

export enum OPEN_FILE_PROGRESS {
  PENDING = 'PENDING',
  OPENING = 'OPENING',
  ERROR = 'ERROR',
  OPEN = 'OPEN'
}
