import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './state';

import App from './App';

const element = document.getElementById('root');

if (element) {
	const root = ReactDOM.createRoot(element);
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}
