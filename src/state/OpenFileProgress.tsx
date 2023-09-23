import React, {
	PropsWithChildren, createContext, useContext, useState,
} from 'react';
import { noop } from '../utils';
import { OPEN_FILE_PROGRESS } from '../types';

const OpenFileProgressInit = OPEN_FILE_PROGRESS.PENDING;
const OpenFileProgress = createContext(OpenFileProgressInit);
const SetOpenFileProgress = createContext(noop as (_a: OPEN_FILE_PROGRESS) => void);

export const OpenFileProgressProvider = ({ children }: PropsWithChildren) => {
	const [openFileProgress, setOpenFileProgress] = useState(OpenFileProgressInit);

	return (
		<OpenFileProgress.Provider value={openFileProgress}>
			<SetOpenFileProgress.Provider value={setOpenFileProgress}>
				{children}
			</SetOpenFileProgress.Provider>
		</OpenFileProgress.Provider>
	);
};

export const useOpenFileProgress = () => useContext(OpenFileProgress);
export const useSetOpenFileProgress = () => useContext(SetOpenFileProgress);
