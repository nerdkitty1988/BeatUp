import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./SingleEventPage.css";

import * as eventActions from "../../store/event";
import { getRsvps } from "../../store/rsvp";
import { getLocations } from "../../store/location";

const SingleEventPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const { eventId } = useParams();

    const [eventName, setEventName] = useState("");
	const [eventLocationId, setEventLocationId] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventPhotoUrl, setEventPhotoUrl] = useState("");
	const [eventOwnerId, setEventOwnerId] = useState("");
	const [groupId, setGroupId] = useState("");
	const [errors, setErrors] = useState([]);
    const [showEdit, setShowEdit] = useState(true);

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
		dispatch(eventActions.getEvents());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRsvps());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	if (!event) return null;

    const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			eventActions.updateEvent({
				eventName,
				eventLocationId,
				eventDate,
				eventTime,
				eventDescription,
				eventPhotoUrl,
				eventOwnerId,
				groupId,
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

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
							placeholder={event.eventName}
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
						/>
					</label>
					<label>
						Location
						<select
							id="locations"
							placeholder={locations[event.eventLocationId]}
							onChange={(e) =>
								setEventLocationId(e.target.value.id)
							}
						>
							{locations.map((location, idx) => (
								<option value={location[idx]}>
									{location.locationName}
								</option>
							))}
						</select>
					</label>
					<button>New Location</button>
					<label>
						Event Date
						<input
							type="date"
							className="editEventInput"
							placeholder={event.eventDate}
							value={eventDate}
							onChange={(e) => setEventDate(e.target.value)}
						/>
					</label>
					<label>
						Event Time
						<input
							type="time"
							className="editEventInput"
							defaultValue={event.eventTime}
							value={eventTime}
							onChange={(e) => setEventTime(e.target.value)}
						/>
					</label>
					<label>
						Event Description
						<textarea
							className="editEventInput"
							value={eventDescription}
							defaultValue={event.eventDescription}
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
							placeholder={event.eventPhotoUrl}
							onChange={(e) => setEventPhotoUrl(e.target.value)}
						/>
					</label>
					{/* if {groups}
                <label>
                    Group
                    <select
                        id="group"
                        placeholder="Your Groups"
                        onChange={(e) => setgroupId(e.target.value.id)}
                    >
                        {groups.map((group, idx) => (
                            <option value={group[idx]}>{group.name}</option>
                        ))}
                    </select>
                </label> */}
					<button type="submit">Submit</button>
				</form>
			</div>
			<div className="singleEventCont">
				<div className="eventCont">
					<div id="editEventNav">
						<button onClick={() => setShowEdit(true ? false : true)}>Edit Event</button>
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
								<p>
									{location.locationName},{" "}
									{location.locationStreet},{" "}
									{location.locationCity},{" "}
									{location.locationState},{" "}
									{location.locationZip}
								</p>
							);
					})}
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
		</div>
	);
};

export default SingleEventPage;
