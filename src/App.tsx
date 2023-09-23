import React from 'react';
import { GlobalStyle } from './globalStyle';
import { MainPage } from './pages';
import { StateProvider } from './state';

const App = () => {
	return (
		<StateProvider>
			<GlobalStyle />
			<MainPage />
		</StateProvider>
	);
};

export default App;
