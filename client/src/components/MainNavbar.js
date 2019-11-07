import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const MainNavbar = function(props) {
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

	// create pages links
	const items_jsx = pages.map((item, idx) => (
		<li key={idx}>
			<NavLink to={item.link}>{item.text}</NavLink>
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

				<li>
					<NavLink to="/" className="btn">
						Logout
					</NavLink>
				</li>

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
			</ul>
		</nav>
	);
};
