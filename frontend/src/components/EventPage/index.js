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

    console.log(events);

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	if (!events) return null;

	return (
		<div className="fullpage">
			<div className="eventListCont">
				<div id="addEventNav">
					<NavLink className="eventGroupNav" to={`/events`}>
						<button type="button" className="eventSelectButton">Events</button>
					</NavLink>
					<NavLink className="eventGroupNav" to={`/groups`}>
						<button type="button" className="eventGroupButton">Groups</button>
					</NavLink>
					<NavLink id="addEvent" to={`/events/add`}>
						<button type="button" id="addEventButton">Create Event</button>
					</NavLink>
				</div>
				<nav>
					{events.map((event) => {
						const readDate = new Date(
							event.eventDate
						).toDateString();
                        const location = event.Location;
                        const rsvps = event.Rsvps;
                        const userRsvp = rsvps.filter((rsvp) => {
                            return rsvp.userId === sessionUser.id && rsvp.eventId === event.id;
                        })
						return (
							<NavLink
								className="eventNavWhole"
								key={event.id}
								to={`events/${event.id}`}
							>
								<div className="eventContainer">
									<div className="eventPhotoDiv">
										<img
											id="eventPhoto"
											src={
												event.eventPhotoUrl
													? event.eventPhotoUrl
													: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommonlook.com%2Ftribe-related-events-placeholder%2F&psig=AOvVaw2KIYVmzCCF1e8p8Hyfj_Px&ust=1631898035505000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjD04_8g_MCFQAAAAAdAAAAABAE"
											}
											alt="event"
										/>
									</div>
									<div className="eventInfo">
										<p key={event.eventDate}>
											{readDate}@{event.eventTime}
										</p>
										<h3>{event.eventName}</h3>
                                        <p>{location.locationCity}, {location.locationState}</p>
                                        <p>{userRsvp.length !== 0 ? userRsvp[0].rsvpStatus : "Not Attending"}</p>
                                        <p>Participants: {event.EventParticipants.length}</p>
									</div>
								</div>
							</NavLink>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default EventPage;
