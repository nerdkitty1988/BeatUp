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
            <div id="addEventNav">
                <NavLink id="addEvent" to={`events/add`}>Add New Event</NavLink>
            </div>
			<nav>
				{events.map((event) => {
					return (
						<NavLink
							key={event.id}
							to={`events/${event.id}`}
						>
							<div className="eventContainer">
								<img
									id="eventPhoto"
									src={
                                        event.eventPhotoUrl ? event.eventPhotoUrl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommonlook.com%2Ftribe-related-events-placeholder%2F&psig=AOvVaw2KIYVmzCCF1e8p8Hyfj_Px&ust=1631898035505000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjD04_8g_MCFQAAAAAdAAAAABAE"
                                    }
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
                                                    <p key={location.id}>{location.locationName}, {location.locationStreet}, {location.locationCity}, {location.locationState}, {location.locationZip}</p>

                                                )
										})}
										<p key="eventDate">{event.eventDate}</p>
										<p key="eventTime">{event.eventTime}</p>
										{rsvps.map((rsvp) => {
											if (
												rsvp.userId ===
													sessionUser.id &&
												rsvp.eventId === event.id
											)
												return <p key={rsvp.id}>{rsvp.rsvpStatus}</p>;
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
