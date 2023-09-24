import React from 'react';
import { openFileProgressSelector, useAppSelector } from '../state';
import styled from 'styled-components';

const Container = styled.div`
	flex: 1;
`;
export const OpenFileStatus = () => {
	const progressStatus = useAppSelector(state => openFileProgressSelector(state));

	return (
		<Container>
			Status:
			{' '}
			{progressStatus}
		</Container>
	);
};
