import "./Navigation.css";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "./beatupLogo.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

    const handleDemoLogin = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login( {credential: "email@email.com", password: "password"} )).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

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
                    <button id="demoButton" type="button" onClick={handleDemoLogin}>Demo User</button>
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
