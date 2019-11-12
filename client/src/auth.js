import React from 'react';

// Main access token stored in RAM
let accessToken = '';

export const setAccessToken = function(newToken) {
	accessToken = newToken;
};

export const getAccessToken = function() {
	return accessToken;
};

export const isLoggedIn = function() {
	return accessToken ? true : false;
};

// this middleware will be called before sending the http request
export const authMiddleware = function(operation, forward) {
	if (accessToken) {
		operation.setContext({
			// WARNING: overwrites the headers?
			headers: {
				authorization: `bearer ${getAccessToken()}`
			}
		});
	}
	return forward(operation);
};

// refresh tokens side effect:
export const useRefreshTokensEffect = function(setLoading) {
	React.useEffect(function() {
		fetch('http://localhost:4000/refresh_tokens', {
			method: 'POST',
			credentials: 'include'
		})
			.then(async (res) => {
				const data = await res.json();
				const token = data.accessToken ? data.accessToken : '';
				setAccessToken(token);
				setLoading(false);
			})
			.catch((err) => console.log('error from server API: /refresh_token:', err.message));
	}, []);
};
