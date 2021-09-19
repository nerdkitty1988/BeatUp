import { useDispatch, useSelector } from "react-redux";
import { getUserEvents } from "../../store/event";
import { getLocations } from "../../store/location";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NextEventPage.css";

const NextEventPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const nextEvent = useSelector((state) => {
		let eventSearch = Object.values(state.eventState.eventList);
		let currentNext = eventSearch[0];
		eventSearch.forEach((event) => {
			if (event.eventDate < currentNext.eventDate) currentNext = event;
		});
		return currentNext;
	});

	const location = useSelector((state) => {
		let locationSearch = Object.values(state.locationState.locationList);
		if (nextEvent) {
			const thisLocation = locationSearch.filter((aLocation) => {
				return aLocation.id === nextEvent.eventLocationId;
			});
			return thisLocation[0];
		}
	});

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUserEvents(sessionUser));
	}, [dispatch]);

	const readDate = nextEvent
		? new Date(nextEvent.eventDate).toDateString()
		: new Date();
	console.log(nextEvent);
	if (!nextEvent || !location)
		return (
			<div className="singleNoEventCont">
				<div className="singleEvent">
					<div className="singleEventPhotoCont">
						<img
							className="singleEventPic"
							src="https://handsontek.net/images/Lists/Default%20Calendar/hero.png"
						/>
					</div>
					<div className="noEventInfoCont">
						<h4 className="notAttending">
							You are not attending any events right now.  Find one today.</h4>
					</div>

					<NavLink to="/events" id="allEventsNav">
						<button id="discoverButton">Discover Events</button>
					</NavLink>
				</div>
			</div>
		);

	return (
		<div className="singleEventCont">
			<NavLink id="nextEventNav" to={`/events/${nextEvent.id}`}>
				<div className="singleEvent">
					<div className="singleEventPhotoCont">
						<img
							className="singleEventPic"
							src={nextEvent.eventPhotoUrl}
						/>
					</div>
					<div className="singleEventInfoCont">
						<p id="sEventDate">
							{readDate}@{nextEvent.eventTime}
						</p>
						<p id="sEventName">{nextEvent.eventName}</p>
						<p id="sEventDescription">
							{nextEvent.eventDescription}
						</p>
						<p>
							{location.locationCity}, {location.locationState}
						</p>
					</div>
				</div>
			</NavLink>
		</div>
	);
};

export default NextEventPage;
