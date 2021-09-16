import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./EventPage.css";

import { getEvents } from "../../store/event";
import { getLocations } from "../../store/location";
import { getRsvps } from "../../store/rsvp";

const EventPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const events = useSelector((state) => {
		return Object.values(state.eventState.eventList);
	});
	const rsvps = useSelector((state) => {
		return Object.values(state.rsvpState.rsvpList);
	});
	const locations = useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});
	console.log(locations);

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRsvps());
	}, [dispatch]);

	if (!events) return null;

	return (
		<div className="eventListCont">
			<nav>
				{events.map((event) => {
					return (
						<NavLink
							key={event.eventName}
							to={`events/${event.id}`}
						>
							<div className="eventContainer">
								<img
									id="eventPhoto"
									src={event.eventPhotoUrl}
									alt="event"
								/>
								<div className="eventInfo">
									<h2>{event.eventName}</h2>
									<div>
										{locations.map((location) => {
											if (
												event.eventLocationId === location.id
											)
												return (
                                                    <p>{location.locationName}, {location.locationStreet}, {location.locationCity}, {location.locationState}, {location.locationZip}</p>

                                                )
										})}
										<p>{event.eventDate}</p>
										<p>{event.eventTime}</p>
										{rsvps.map((rsvp) => {
											if (
												rsvp.userId ===
													sessionUser.id &&
												rsvp.eventId === event.id
											)
												return <p>{rsvp.rsvpStatus}</p>;
										})}
									</div>
								</div>
							</div>
						</NavLink>
					);
				})}
			</nav>
		</div>
	);
};

export default EventPage;
