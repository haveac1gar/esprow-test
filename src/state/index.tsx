import React, { PropsWithChildren } from "react";
import { LoadingStateProvider } from "./LoadingState";
import { EntryFileProvider } from "./EntryFile";

export { useSetEntryFile, useEntryFile, useEntryFileFields, type EntryFileRaw, type EntryFile } from './EntryFile';
export { useSetLoadingState, useLoadingState, LoadingStatus} from './LoadingState';

export const Context = (props: PropsWithChildren) => {
  return (
    <LoadingStateProvider>
      <EntryFileProvider>
        {props.children}
      </EntryFileProvider>
    </LoadingStateProvider>
  )
}
