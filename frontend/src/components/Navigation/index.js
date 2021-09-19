import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "./beatupLogo.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<div id="navBarLinks">
					<NavLink to="/signup" className="loginSignup">
						Sign Up
					</NavLink>
					<NavLink to="/login" className="loginSignup">
						Log In
					</NavLink>
				</div>
			</>
		);
	}

	return (
		<div id="navBar">
			<div id="logo">
				<NavLink exact to="/" className="logo">
					<img className="logo-img" src={logo} alt="beatupLogo" />
				</NavLink>
			</div>
			<div className="searchBar">
				<form>
					<input
						id="searchInput"
						type="text"
						placeholder="Search in events and groups..."
					/>
					<button id="searchButton" type="submit">
						🥊
					</button>
				</form>
			</div>
			<div className="navLinks">{isLoaded && sessionLinks}</div>
		</div>
	);
}

export default Navigation;
