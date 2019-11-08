import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './client';

// const client = new ApolloClient({ uri: 'http://localhost:4000/graphql', credentials: 'include' });

const root = (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

ReactDOM.render(root, document.getElementById('root'));
