import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const MainNavbar = (props) => {
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

	// create componenets
	const items_jsx = pages.map((item) => (
		<li>
			<NavLink to={item.link}>{item.text}</NavLink>
		</li>
	));

	return (
		<nav className="nav-wrapper indigo">
			<NavLink to="/" className="brand-logo">
				Nutrition App
			</NavLink>
			<NavLink to="#" class="sidenav-trigger" data-target="mobile-links">
				<i class="material-icons">menu</i>
			</NavLink>

			<ul id="nav-mobile" class="right hide-on-med-and-down">
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
