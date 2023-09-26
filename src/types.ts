import { Opaque } from 'ts-essentials';

export type ItemId = Opaque<string, 'ItemId'>;
export type EntryFileValue = string | number | boolean | unknown[] | Record<string, unknown>;
export type EntryFileRow = {
  id: ItemId;
  __renderFieldType: FIELD_TYPE;
} & Record<string, EntryFileValue>;

export type EntryFile = EntryFileRow[];
export type EntryFileMap = Record<ItemId, EntryFileRow>;

export enum FIELD_TYPE {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  EMAIL = 'EMAIL',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  LONG_TEXT = 'LONG_TEXT',
  JSON_LIKE_VALUE = 'JSON_LIKE_VALUE',
  UNKNOWN = 'UNKNOWN',
}

export enum OPEN_FILE_PROGRESS {
  PENDING = 'PENDING',
  OPENING = 'OPENING',
  ERROR = 'ERROR',
  OPEN = 'OPEN'
}
