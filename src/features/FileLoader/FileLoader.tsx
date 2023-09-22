import React, { useCallback } from 'react';
import {
	EntryFileType,
	LoadingStatus, useSetEntryFile, useSetLoadingState,
} from '../../state';

export const FileLoader = () => {
	const setEntryFile = useSetEntryFile();
	const setLoadingState = useSetLoadingState();

	const handleFileChosen = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (!setLoadingState) return;

		setLoadingState(LoadingStatus.LOADING);

		try {
			e.preventDefault();

			const { files } = e.target;

			if (!files || !files[0]) {
				setLoadingState(LoadingStatus.ERROR);
				return;
			}

			const fileReader = new FileReader();

			fileReader.onloadend = () => {
				try {
					const entryFile = JSON.parse(fileReader.result as string) as EntryFileType;
					setEntryFile(entryFile);
					setLoadingState(LoadingStatus.OPENED);
				} catch (e) {
					setLoadingState(LoadingStatus.ERROR);
				}
			};

			fileReader.readAsText(files[0]);
		} catch (e) {
			setLoadingState(LoadingStatus.ERROR);
		}
	}, [setEntryFile, setLoadingState]);

	return (
		<input
			type="file"
			accept="json"
			onChange={handleFileChosen}
		/>
	);
};
