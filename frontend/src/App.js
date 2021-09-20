import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventPage from "./components/EventPage"
import HomePage from "./components/HomePage";
import SingleEventPage from "./components/SingleEventPage";
import AddEventPage from "./components/AddEventPage";
import UserEventPage from "./components/UserEventPage";
import GroupPage from "./components/GroupPage";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
                    <Route exact path="/events/add">
                        <AddEventPage />
                    </Route>
                    <Route path="/events/:eventId">
                        <SingleEventPage />
                    </Route>
                    <Route path="/events">
                        <EventPage />
                    </Route>
                    <Route path="/events/user/:userId">
                        <UserEventPage />
                    </Route>
                    <Route path="/groups">
                        <GroupPage />
                    </Route>
				</Switch>
			)}
		</>
	);
}

export default App;
