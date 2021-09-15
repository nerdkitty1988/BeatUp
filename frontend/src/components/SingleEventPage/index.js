import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SingleEventPage.css";

import { getEvents } from "../../store/event";

const SingleEventPage = () => {
	const dispatch = useDispatch();
	const { eventId } = useParams();

	const event = useSelector((state) => {
		return Object.values(state.eventState.eventList)[eventId - 1];
	});
	const rsvps = useSelector((state) => {
		return Object.values(state.eventState.rsvpStatus);
	});

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	if (!event) return null;

	return (
		<div className="singleEventCont">
			<div className="eventCont">
                <img id="eventImg" alt="event" src={event.eventPhotoUrl} />
				<h1>{event.eventName}</h1>
				<p>{event.eventLocationId}</p>
				<p>{event.eventDate}</p>
				<p>{event.eventTime}</p>
				<p>{rsvps[event.id - 1].rsvpStatus}</p>
			</div>
		</div>
	);
};

export default SingleEventPage;
