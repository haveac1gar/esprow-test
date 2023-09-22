import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

export enum LoadingStatus {
  INIT = 'INIT',
  LOADING = 'LOADING',
  OPENED = 'OPENED',
  ERROR = 'ERROR',
}

const LoadingStateDefault = LoadingStatus.INIT;
const LoadingState = createContext(LoadingStateDefault);
const SetLoadingState = createContext((_a: LoadingStatus) => {});

export const LoadingStateProvider = (props: PropsWithChildren) => {
  const [loadingState, setLoadingState] = useState(LoadingStateDefault);

  return (
    <LoadingState.Provider value={loadingState}>
      <SetLoadingState.Provider value={setLoadingState}>
        {props.children}
      </SetLoadingState.Provider>
    </LoadingState.Provider>
  )
}

export const useLoadingState = () => useContext(LoadingState);
export const useSetLoadingState = () => useContext(SetLoadingState);