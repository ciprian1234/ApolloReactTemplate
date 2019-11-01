import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import MainNavbar from "./MainNavbar";

const Home = () => <h1>Home</h1>;
const Info = () => <h1>Food info</h1>;
const Recipes = () => <h1>Food recipes</h1>;
const About = () => <h1>About</h1>;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavbar />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/info" component={Info} exact />
            <Route path="/recipes" component={Recipes} />
            <Route path="/about" component={About} exact />
            <Route path="/register" component={null} exact />
            <Route path="/login" component={null} exact />
            <Route path="/statistics" component={null} exact />
            <Route path="/editprofile" component={null} exact />
            <Route path="/" component={() => <h1>404 Page not found!</h1>} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
