import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import * as Auth from './auth';

// create authentication middleware
const authMiddleware = new ApolloLink(Auth.authMiddleware);

// create network interface layer
const htppLink = new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' });

// create cache in-memory layer
const cache = new InMemoryCache();

// create error handling function
const handleError = onError(({ graphQLErrors, networkError }) => {
	console.error(graphQLErrors);
	console.error(networkError);
});

// create refresh token middleware
const refreshTokenMiddleware = new TokenRefreshLink({
	accessTokenField: 'accessToken',
	isTokenValidOrUndefined: function() {
		const token = Auth.getAccessToken();
		if (!token) return true;
		try {
			const { exp } = jwtDecode(token);
			if (Date.now >= exp * 1000) return false;
			return true;
		} catch {
			return false;
		}
	},
	fetchAccessToken: function() {
		return fetch('http://localhost:4000/refresh_tokens', {
			method: 'POST',
			credentials: 'include'
		});
	},
	handleFetch: function(token) {
		Auth.setAccessToken(token);
	},
	handleError: function(err) {
		console.log('Error from refreshTokenMiddleware!:', err.message);
	}
});

// create the client instace
export const client = new ApolloClient({
	link: ApolloLink.from([refreshTokenMiddleware, handleError, authMiddleware, htppLink]),
	cache
});
