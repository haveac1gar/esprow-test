import React from 'react';
import { ELEMENT_ROW_HEIGHT, MemoizedElementRow, VirtualizedList } from '../components';
import styled from 'styled-components';

import test from './test.json';

const PageContainer = styled.div`
	padding: 32px;
	height: 100vh;
	width: 100%;

	display: flex;
	flex-direction: column;
`;
export const MainPage = () => {
	return (
		<PageContainer>
			Main Page!
			<VirtualizedList
				RowComponent={MemoizedElementRow}
				rowHeight={ELEMENT_ROW_HEIGHT}
				items={test}
			/>
		</PageContainer>
	);
};
