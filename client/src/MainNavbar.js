import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to="/statistics">Statistics</NavLink>
      </li>

      <li>
        <NavLink to="/editprofile">Edit profile</NavLink>
      </li>

      <li>
        <NavLink to="/">Logout</NavLink>
      </li>
    </ul>
  );
};

const SignedOutLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>

      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
};

class MainNavbar extends React.Component {
  render() {
    return (
      <header>
        <h1>
          <NavLink to="/">NutritionApp</NavLink>
        </h1>

        <ul>
          <li>
            <NavLink to="/info">Food Info</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>

        <SignedInLinks />
        <SignedOutLinks />
      </header>
    );
  }
}

export default MainNavbar;
