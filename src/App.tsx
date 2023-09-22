import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './globalStyle';
import { FileLoader, DataTable } from './features';
import { Context, useLoadingState } from './state';

const Container = styled.div`
	padding: 16px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const MainContainer = (props: PropsWithChildren) => {
	const state = useLoadingState();

	return (
		<Container>
			<FileLoader />
			<br />
			State: {state}
			<br />
			<DataTable />
		</Container>
	);
}

const App = () => {
	return (
		<Context>
			<GlobalStyle />
			<MainContainer />
		</Context>
	);
};

export default App;
