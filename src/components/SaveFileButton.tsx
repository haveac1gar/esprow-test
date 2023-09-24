import React, { useCallback } from 'react';
import styled from 'styled-components';
import { EntryFile } from '../types';
import { useAppSelector } from '../state';

const Container = styled.div`

`;

const Button = styled.button`
	outline: none;
	padding: 16px;
	font-size: 14px;
`;

export const SaveFileButton = ({ file }: { file: EntryFile }) => {
	const filename = useAppSelector(state => state.entryFile.name);

	const onClick = useCallback(() => {
		if (!filename) return;

		const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'json' });
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement('a');

		downloadLink.href = url;
		downloadLink.download = filename;

		// Append download link to the DOM and trigger a click to start the download
		document.body.appendChild(downloadLink);
		downloadLink.click();

		// Clean up after the download is complete
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(url);
	}, [file, filename]);

	if (!filename) return null;

	return (
		<Container>
			<Button onClick={onClick} type="button" disabled={!filename}>
				Save
				{' '}
				{filename}
			</Button>
		</Container>
	);
};
