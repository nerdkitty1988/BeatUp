import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./EventPage.css";

import { getEvents } from "../../store/event";

const EventPage = () => {
	const dispatch = useDispatch();

	const events = useSelector((state) => {
		return Object.values(state.eventState.eventList);
	});
	const rsvps = useSelector((state) => {
		return Object.values(state.eventState.rsvpStatus);
	});

	useEffect(() => {
		dispatch(getEvents());
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
										<p>{event.eventLocationId}</p>
										<p>{event.eventDate}</p>
										<p>{event.eventTime}</p>
                                        <p>{rsvps[event.id - 1].rsvpStatus}</p>
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
