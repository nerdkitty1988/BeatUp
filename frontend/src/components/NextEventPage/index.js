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
        const thisLocation = locationSearch.filter ((aLocation) => {
            return aLocation.id === nextEvent.eventLocationId;
        })
        return thisLocation[0];
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
	if (!nextEvent)
		return (
			<div className="noEventsCont">
				<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fimages%2Fevents&psig=AOvVaw3oTD82PR-jFjb8kEWhFZXU&ust=1632082097287000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDCpuWpifMCFQAAAAAdAAAAABAD" />
				<h3 className="notAttending">
					You are not attending any events right now.
				</h3>
				<h3 className="notAttending">Find one today.</h3>
				<NavLink to="/events" id="allEventsNav">
					Discover Events
				</NavLink>
			</div>
		);

	return (
		<div id="singleEventCont">
			<NavLink id="nextEventNav" to={`/events/${nextEvent.id}`}>
				<div className="singleEvent">
					<div className="singleEventPhotoCont">
						<img
							id="singleEventPic"
							src={nextEvent.eventPhotoUrl}
						/>
					</div>
					<div className="singleEventInfoCont">
						<p id="sEventDate">{readDate}@{nextEvent.eventTime}</p>
						<p id="sEventName">{nextEvent.eventName}</p>
						<p id="sEventDescription">
							{nextEvent.eventDescription}
						</p>
                        <p>{location.locationCity}, {location.locationState}</p>
					</div>
				</div>
			</NavLink>
		</div>
	);
};

export default NextEventPage;
