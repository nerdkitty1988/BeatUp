import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SingleEventPage.css";

import { getEvents } from "../../store/event";
import { getRsvps } from "../../store/rsvp";
import { getLocations } from "../../store/location";

const SingleEventPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const { eventId } = useParams();

	const event = useSelector((state) => {
		return Object.values(state.eventState.eventList)[eventId - 1];
	});
	const rsvps = useSelector((state) => {
		return Object.values(state.rsvpState.rsvpList);
	});
    const locations = useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRsvps());
	}, [dispatch]);

    useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	if (!event) return null;

	return (
		<div className="singleEventCont">
			<div className="eventCont">
				<img id="eventImg" alt="event" src={event.eventPhotoUrl} />
				<h1>{event.eventName}</h1>
				{locations.map((location) => {
					if (event.eventLocationId === location.id)
						return (
							<p>
								{location.locationName},{" "}
								{location.locationStreet},{" "}
								{location.locationCity},{" "}
								{location.locationState}, {location.locationZip}
							</p>
						);
				})}
                <button>New Location</button>
                <p>{event.eventDescription}</p>
				<p>{event.eventDate}</p>
				<p>{event.eventTime}</p>
				{rsvps.map((rsvp) => {
					if (
						rsvp.userId === sessionUser.id &&
						rsvp.eventId === event.id
					)
						return <p>{rsvp.rsvpStatus}</p>;
				})}
			</div>
		</div>
	);
};

export default SingleEventPage;
