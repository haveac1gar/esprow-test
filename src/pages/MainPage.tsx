import React from 'react';
import { OpenFileButton, OpenFileStatus, SaveFileButton, VirtualizedList } from '../components';
import styled from 'styled-components';
import { useAppSelector } from '../state';

const PageContainer = styled.div`
	padding: 32px;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 32px 0;
`;
export const MainPage = () => {
	const entryFile = useAppSelector(state => state.entryFile.arr);

	return (
		<PageContainer>
			<Header>
				<OpenFileButton />
				<OpenFileStatus />
				<SaveFileButton file={entryFile} />
			</Header>
			<VirtualizedList items={entryFile} />
		</PageContainer>
	);
};
