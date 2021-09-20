import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./SingleEventPage.css";

import { getEvents, updateEvent, deleteEvent } from "../../store/event";
import { getLocations } from "../../store/location";
import { createRsvp } from "../../store/rsvp";

const SingleEventPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const { eventId } = useParams();
	let history = useHistory();

	const event = useSelector((state) => state.eventState.eventList[eventId]);
	const locations = useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});

	let rsvps;
	let location;

	if (event) {
		rsvps = event.Rsvps.filter((rsvp) => {
			return rsvp.userId === sessionUser.id;
		})[0];
		location = event.Location;
	}

	const [eventName, setEventName] = useState(event ? event.eventName : "");
	const [eventLocationId, setEventLocationId] = useState(
		event ? locations[event.eventLocationId] : ""
	);
	const [eventDate, setEventDate] = useState(
		event ? event.eventDate : new Date()
	);
	const [eventTime, setEventTime] = useState(event ? event.eventTime : "");
	const [eventDescription, setEventDescription] = useState(
		event ? event.eventDescription : ""
	);
	const [eventPhotoUrl, setEventPhotoUrl] = useState(
		event
			? event.eventPhotoUrl
			: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommonlook.com%2Ftribe-related-events-placeholder%2F&psig=AOvVaw2KIYVmzCCF1e8p8Hyfj_Px&ust=1631898035505000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjD04_8g_MCFQAAAAAdAAAAABAE"
	);
	const [eventOwnerId, setEventOwnerId] = useState();
	const [groupId, setGroupId] = useState();
    const [rsvpStatus, setRsvpStatus] = useState();
	const [errors, setErrors] = useState([]);
	const [showEdit, setShowEdit] = useState(true);

	const readDate = event
		? new Date(event.eventDate).toDateString()
		: new Date();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = {
			id: eventId,
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
		};
		let updatedEvent = await dispatch(updateEvent(payload));
		if (updatedEvent) {
			setShowEdit(true);
		}
	};

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	const handleDelete = async (e) => {
		e.preventDefault();
		await dispatch(deleteEvent(event));
		history.push("/events");
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowEdit(true);
	};

    const handleCreateRsvp = () => {
        const newRsvp = {
            userId: sessionUser.id,
            eventId: event.id,
            rsvpStatus
        }
        history.push(`/events`)
        dispatch(createRsvp(newRsvp))
    };

	if (!event) return null;

	return (
		<div id="wholeEvent">
			<div className="editEventCont" hidden={showEdit}>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Event Name
						<input
							type="text"
							className="editEventInput"
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
						/>
					</label>
					<label>
						Location
						<select
							id="locations"
							value={eventLocationId}
							onChange={(e) => setEventLocationId(e.target.value)}
						>
							{locations.map((location, idx) => (
								<option key={location.id} value={location.id}>
									{location.locationName}
								</option>
							))}
						</select>
					</label>
					<NavLink to="/locations/add">New Location</NavLink>
					<label>
						Event Date
						<input
							type="date"
							className="editEventInput"
							value={eventDate}
							onChange={(e) => {
								let updatedDate = e.target.value;
								setEventDate(updatedDate);
							}}
						/>
					</label>
					<label>
						Event Time
						<input
							type="time"
							className="editEventInput"
							value={eventTime}
							onChange={(e) => setEventTime(e.target.value)}
						/>
					</label>
					<label>
						Event Description
						<textarea
							className="editEventInput"
							value={eventDescription}
							rows="10"
							col="55"
							onChange={(e) =>
								setEventDescription(e.target.value)
							}
						/>
					</label>
					<label>
						Event Photo URL
						<input
							type="url"
							className="editEventInput"
							value={eventPhotoUrl}
							onChange={(e) => setEventPhotoUrl(e.target.value)}
						/>
					</label>
					<button type="submit">Submit</button>
					<button type="button" onClick={handleCancelClick}>
						Cancel
					</button>
				</form>
			</div>
			<div className="singleEventCont">
				<div className="eventCont">
					<div id="editEventNav">
						<button
							className="singleEventButtons"
							onClick={() => setShowEdit(true ? false : true)}
						>
							Edit Event
						</button>
						<button
							className="singleEventButtons"
							onClick={handleDelete}
						>
							Delete Event
						</button>
					</div>
					<img
						id="eventPhoto"
						src={
							event.eventPhotoUrl
								? event.eventPhotoUrl
								: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommonlook.com%2Ftribe-related-events-placeholder%2F&psig=AOvVaw2KIYVmzCCF1e8p8Hyfj_Px&ust=1631898035505000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjD04_8g_MCFQAAAAAdAAAAABAE"
						}
						alt="event"
					/>
					<h1>{event.eventName}</h1>
					{locations.map((location) => {
						if (event.eventLocationId === location.id)
							return (
								<p key="locAddress">
									{location.locationName},{" "}
									{location.locationStreet},{" "}
									{location.locationCity},{" "}
									{location.locationState},{" "}
									{location.locationZip}
								</p>
							);
					})}
					<p key="eventDesc">{event.eventDescription}</p>
					<p key="eventDate">{readDate}</p>
					<p key="eventTime">{event.eventTime}</p>
					{rsvps ? (
						<p>{rsvps.rsvpStatus}</p>
					) : (
						<select id="rsvpChoice" onChange={(e) => setEventName(e.target.value), handleCreateRsvp}>
							<option value="Attending">Attending</option>
							<option value="Not Attending">Not Attending</option>
							<option value="Maybe">Maybe</option>
						</select>
					)}
				</div>
                <NavLink className="singleEventButtons" to="/events">Back to Events</NavLink>
			</div>
		</div>
	);
};

export default SingleEventPage;
