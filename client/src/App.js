import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import { MainNavbar } from './components/MainNavbar';
import { Register } from './pages/register';

const Home = () => <h1>Home</h1>;
const Info = () => <h1>Food info</h1>;
const Recipes = () => <h1>Food recipes</h1>;
const About = () => <h1>About</h1>;

// user context
const UserContext = React.createContext();

const App = () => {
	const [user, setUser] = useState({});

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
						<Route path="/login" component={null} exact />
						<Route path="/statistics" component={null} exact />
						<Route path="/profile" component={null} exact />
						<Route path="/" component={() => <h2>404 Page not found!</h2>} />
					</Switch>
				</main>
				{/* <footer className="footer">Footer</footer> */}
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
