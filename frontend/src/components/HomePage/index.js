import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUserEvents } from "../../store/event";

import { useSelector, useDispatch } from "react-redux";
import "./HomePage.css";

import NextEventPage from "../NextEventPage";

function HomePage() {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const nextEvent = useSelector((state) => {
		let eventSearch = Object.values(state.eventState.eventList);
		let currentNext = eventSearch[0];
		eventSearch.forEach((event) => {
			if (event.eventDate < currentNext.eventDate) currentNext = event;
		});
		return currentNext;
	});

	useEffect(() => {
		dispatch(getUserEvents(sessionUser));
	}, [dispatch]);

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
	}

	return (
		<div id="homeContainer">
			<div className="nextEvent">
				<div id="nextEventTop">
					<h1>Your next event</h1>
					<div>
						<NavLink
							id="seeAllButton"
							to={`/events/user/${sessionUser.id}`}
						>
							<button className="userEventsButton">
								All {sessionUser.username}'s Events
							</button>
						</NavLink>
						<NavLink to={"/events"}>
							<button className="userEventsButton">
								All Events
							</button>
						</NavLink>
					</div>
				</div>
				<div className="nextEventCont">
					<NextEventPage nextEvent={nextEvent} />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
