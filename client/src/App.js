import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

// import UserContext
import { UserContext } from './context';

// import pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Info } from './pages/Info';
import { Recipes } from './pages/Recipes';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';

//import componenets
import { MainNavbar } from './components/MainNavbar';
import * as Auth from './auth';

const App = () => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true); // user global context

	// send a request to refresh access token before rendering the app
	Auth.useRefreshTokensEffect(setLoading);

	if (loading) return <p>Loading...</p>; //TODO: Loading animation

	return (
		<BrowserRouter>
			<UserContext.Provider value={user}>
				<header className="header">
					<MainNavbar />
				</header>
				<div className="menu">Sidebar</div>
				<main className="content">
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/info" component={Info} exact />
						<Route path="/recipes" component={Recipes} />
						<Route path="/about" component={About} exact />
						<Route path="/register" component={Register} exact />
						<Route path="/login" component={Login} exact />
						<Route path="/statistics" component={null} exact />
						<Route path="/profile" component={Profile} exact />
						<Route path="/" component={() => <h2>404 Page not found!</h2>} />
					</Switch>
				</main>
				{/* <footer className="footer">Footer</footer> */}
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
