import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

// import UserContext
import { UserContext } from './context';
import { PrivateRoute } from './components/PrivateRoute';

// import pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Info } from './pages/Info';
import { Recipes } from './pages/Recipes';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Statistics } from './pages/Statistics';
import { Profile } from './pages/Profile';

//import componenets
import { MainNavbar } from './components/MainNavbar';
import * as Auth from './auth';

const App = () => {
	const [user, setUser] = React.useState(null); // user global context
	const [loading, setLoading] = React.useState(true);

	// send a request to refresh access token before rendering the app
	Auth.useRefreshTokensEffect(setLoading);

	if (loading) return <p>Loading...</p>; //TODO: Loading animation

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<header className="header">
					<MainNavbar />
				</header>
				<div className="menu">Sidebar</div>
				<main className="content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/info" component={Info} />
						<Route exact path="/recipes" component={Recipes} />
						<Route exact path="/about" component={About} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<PrivateRoute exact path="/statistics" component={Statistics} />
						<PrivateRoute exact path="/profile" component={Profile} />
						<Route path="/" component={() => <h2>404 Page not found!</h2>} />
					</Switch>
				</main>
				{/* <footer className="footer">Footer</footer> */}
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
