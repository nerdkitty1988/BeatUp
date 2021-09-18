import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { createEvent } from "../../store/event";
import { getLocations } from "../../store/location";
import "./AddEventPage.css";

const AddEventPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
    let history = useHistory();
	const [eventName, setEventName] = useState("");
	const [eventLocationId, setEventLocationId] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventPhotoUrl, setEventPhotoUrl] = useState(
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
	);
	const [eventOwnerId, setEventOwnerId] = useState(sessionUser.id);
	const [groupId, setGroupId] = useState("");
	const [errors, setErrors] = useState([]);

	const locations = useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = {
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
            eventOwnerId
		};
		dispatch(createEvent(payload));
        history.push(`/events`)

	};

	return (
		<div id="newEventCont">
			<div id="formCont">
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
								let updatedDate = e.target.value.toString();
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
		</div>
	);
};

export default AddEventPage;
