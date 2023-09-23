import React from 'react';
import { OPEN_FILE_PROGRESS } from '../types';

type OpenFileStatusProps = {
  status: OPEN_FILE_PROGRESS,
}
export const OpenFileStatus = ({ status }: OpenFileStatusProps) => {
	return (
		<>
			Status:
			{' '}
			{status}
		</>
	);
};
