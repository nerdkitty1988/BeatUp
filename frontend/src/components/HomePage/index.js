import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import "./HomePage.css";

import NextEventPage from "../NextEventPage";

function HomePage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) {
		return (
			<div id="homeContainer">
				<div>
					<h1>Wanna rumble?</h1>
					<NavLink to="/signup">Sign up</NavLink>
					<h2>Already a Fighter?</h2>
					<NavLink to="/login">Sign in</NavLink>
				</div>
			</div>
		);
	} else {
		return (
			<div id="homeContainer">
				<div className="nextEvent">
					<div id="nextEventTop">
						<h1>Your next event</h1>
						<NavLink
							id="seeAllButton"
							to={`/events/user/${sessionUser.id}`}
						>
							<button id="userEventsButton">All {sessionUser.username}'s Events</button>
						</NavLink>
					</div>
					<div className="nextEventCont">
						<NextEventPage />
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;
