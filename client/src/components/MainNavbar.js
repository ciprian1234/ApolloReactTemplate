import React, { Fragment } from 'react';
import { Link, NavLink, useHistory, Redirect } from 'react-router-dom';

import * as Auth from '../auth';
import { UserContext } from '../context';

export const MainNavbar = function(props) {
	const history = useHistory();
	const userContext = React.useContext(UserContext);

	const pages = [
		{
			link: '/info',
			text: 'Food Info',
			loggedIn: false
		},
		{
			link: '/about',
			text: 'About',
			loggedIn: false
		},
		{
			link: '/statistics',
			text: 'Statistics',
			loggedIn: true
		},
		{
			link: '/profile',
			text: 'Profile',
			loggedIn: true
		}
	];

	// if not logged in display only !loggedIn links
	// if logged in, display all links
	// create pages links
	const items_jsx = pages.map((item, idx) => (
		<li key={idx}>
			{(Auth.isLoggedIn() || !item.loggedIn) && <NavLink to={item.link}>{item.text}</NavLink>}
		</li>
	));

	return (
		<nav className="nav-wrapper indigo">
			<NavLink to="/" className="brand-logo">
				Nutrition App
			</NavLink>
			<NavLink to="#" className="sidenav-trigger" data-target="mobile-links">
				<i className="material-icons">menu</i>
			</NavLink>

			<ul id="nav-mobile" className="right hide-on-med-and-down">
				{items_jsx}

				{Auth.isLoggedIn() ? (
					<Fragment>
						<li>
							<NavLink to="/" className="btn" onClick={(e) => handleLogout(history, userContext)}>
								Logout
							</NavLink>
						</li>
					</Fragment>
				) : (
					<Fragment>
						<li>
							<NavLink to="/login" className="btn">
								Login
							</NavLink>
						</li>

						<li>
							<NavLink to="/register" className="btn">
								Register
							</NavLink>
						</li>
					</Fragment>
				)}
			</ul>
		</nav>
	);
};

const logout_mutation = {
	operationName: 'logout',
	variables: {},
	query: 'mutation logout {logout}'
};

async function handleLogout(history, userContext) {
	let response = await fetch('http://localhost:4000/graphql', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `bearer ${Auth.getAccessToken()}`
		},
		body: JSON.stringify(logout_mutation)
	});
	let data = await response.json();
	// userContext.setUser(null);
	Auth.setAccessToken('');
	history.push('/');
}
