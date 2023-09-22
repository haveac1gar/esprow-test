import React, {
	PropsWithChildren, createContext, useContext, useState,
} from 'react';
import { noop } from '../utils';

export enum LoadingStatus {
  INIT = 'INIT',
  LOADING = 'LOADING',
  OPENED = 'OPENED',
  ERROR = 'ERROR',
}

const LoadingStateDefault = LoadingStatus.INIT;
const LoadingState = createContext(LoadingStateDefault);
const SetLoadingState = createContext(noop as (_a: LoadingStatus) => void);

export const LoadingStateProvider = ({ children }: PropsWithChildren) => {
	const [loadingState, setLoadingState] = useState(LoadingStateDefault);

	return (
		<LoadingState.Provider value={loadingState}>
			<SetLoadingState.Provider value={setLoadingState}>
				{children}
			</SetLoadingState.Provider>
		</LoadingState.Provider>
	);
};

export const useLoadingState = () => useContext(LoadingState);
export const useSetLoadingState = () => useContext(SetLoadingState);
