import React, { useCallback } from 'react';
import { EntryFile, OPEN_FILE_PROGRESS } from '../types';

export type OpenFileButtonProps = {
  onProgressChange: (a: OPEN_FILE_PROGRESS) => void,
  onFileOpened: (a: EntryFile) => void,
};

export const OpenFileButton = ({ onProgressChange, onFileOpened }: OpenFileButtonProps) => {
	const handleFileChosen = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		onProgressChange(OPEN_FILE_PROGRESS.OPENING);

		try {
			e.preventDefault();

			const { files } = e.target;

			if (!files || !files[0]) {
				onProgressChange(OPEN_FILE_PROGRESS.ERROR);
				return;
			}

			const fileReader = new FileReader();

			fileReader.onloadend = () => {
				try {
					const entryFile = JSON.parse(fileReader.result as string) as EntryFile;
					if (!Array.isArray(entryFile)) throw Error('JSON file is not an array');

					onFileOpened(entryFile);
					onProgressChange(OPEN_FILE_PROGRESS.OPEN);
				} catch (e) {
					onProgressChange(OPEN_FILE_PROGRESS.ERROR);
				}
			};

			fileReader.readAsText(files[0]);
		} catch (e) {
			onProgressChange(OPEN_FILE_PROGRESS.ERROR);
		}
	}, [onProgressChange, onFileOpened]);

	return (
		<input
			type="file"
			accept="json"
			onChange={handleFileChosen}
		/>
	);
};
