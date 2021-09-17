import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./SingleEventPage.css";


import { getEvents, updateEvent, deleteEvent } from "../../store/event";
import { getRsvps } from "../../store/rsvp";
import { getLocations } from "../../store/location";


const SingleEventPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const { eventId } = useParams();
    let history = useHistory();

	const [eventName, setEventName] = useState("");
	const [eventLocationId, setEventLocationId] = useState();
	const [eventDate, setEventDate] = useState();
	const [eventTime, setEventTime] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventPhotoUrl, setEventPhotoUrl] = useState("");
	const [eventOwnerId, setEventOwnerId] = useState();
	const [groupId, setGroupId] = useState();
	const [errors, setErrors] = useState([]);
	const [showEdit, setShowEdit] = useState(true);

    const events = useSelector((state) => {
        return Object.values(state.eventState.eventList);
    });

    const event = events[eventId - 1];

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
        let updatedEvent = await dispatch(updateEvent(payload))
        if (updatedEvent) {
            setShowEdit(true);
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(event));
        history.push('/events');
    }

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
							defaultValue={event.eventName}
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
						/>
					</label>
					<label>
						Location
						<select
							id="locations"
							defaultValue={locations[event.eventLocationId]}
                            value={eventLocationId}
							onChange={(e) =>
								setEventLocationId(e.target.value)
							}
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
							defaultValue={event.eventDate}
							value={eventDate}
							onChange={(e) => {
                                let updatedDate = e.target.value.toString();
                                setEventDate(updatedDate)}}
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
                            defaultValue={event.eventPhotoUrl}
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
						<button
							onClick={() => setShowEdit(true ? false : true)}
						>
							Edit Event
						</button>
                        <button
                            onClick={handleDelete}>
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
					<p key="eventDate">{event.eventDate}</p>
					<p key="eventTime">{event.eventTime}</p>
					{rsvps.map((rsvp) => {
						if (
							rsvp.userId === sessionUser.id &&
							rsvp.eventId === event.id
						)
							return <p key={rsvp.id}>{rsvp.rsvpStatus}</p>;
					})}
				</div>
			</div>
		</div>
	);
};

export default SingleEventPage;
