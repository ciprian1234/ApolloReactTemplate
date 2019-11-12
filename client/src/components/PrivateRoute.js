import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../auth';

// Input component cannot be null
export const PrivateRoute = function({ component: Component, ...rest }) {
	const renderComponent = function(routeProps) {
		if (isLoggedIn()) {
			return <Component {...routeProps} />;
		} else return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />;
	};

	return <Route {...rest} render={renderComponent} />;
};
