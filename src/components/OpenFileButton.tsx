import React, { useCallback } from 'react';
import { EntryFile, OPEN_FILE_PROGRESS } from '../types';
import { loadFile, useAppDispatch, setProgress } from '../state';
import styled from 'styled-components';

export type OpenFileButtonProps = {
  onProgressChange: (a: OPEN_FILE_PROGRESS) => void,
  onFileOpened: (a: EntryFile) => void,
};

const Input = styled.input`
	outline: none;
	font-size: 16px;
`;

export const OpenFileButton = () => {
	const dispatch = useAppDispatch();

	const handleFileChosen = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setProgress(OPEN_FILE_PROGRESS.OPENING));

		try {
			e.preventDefault();

			const { files } = e.target;

			if (!files || !files[0]) {
				dispatch(setProgress(OPEN_FILE_PROGRESS.ERROR));
				return;
			}

			const fileReader = new FileReader();
			const filename = files[0].name;

			fileReader.onloadend = () => {
				try {
					const entryFile = JSON.parse(fileReader.result as string) as EntryFile;
					if (!Array.isArray(entryFile)) throw Error('JSON file is not an array');

					dispatch(loadFile({ data: entryFile, filename }));
					dispatch(setProgress(OPEN_FILE_PROGRESS.OPEN));
				} catch (e) {
					dispatch(setProgress(OPEN_FILE_PROGRESS.ERROR));
				}
			};

			fileReader.readAsText(files[0]);
		} catch (e) {
			dispatch(setProgress(OPEN_FILE_PROGRESS.ERROR));
		}
	}, [dispatch]);

	return (
		<Input
			type="file"
			accept="json"
			onChange={handleFileChosen}
		/>
	);
};
