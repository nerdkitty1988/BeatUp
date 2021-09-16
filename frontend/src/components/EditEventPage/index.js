import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import * as eventActions from "../../store/event";
import "./EditEvent.css";

function EditEventPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [eventName, setEventName] = useState("");
	const [eventLocationId, seteventLocationId] = useState("");
	const [eventDate, seteventDate] = useState("");
	const [eventTime, seteventTime] = useState("");
	const [eventDescription, seteventDescription] = useState("");
	const [eventPhotoUrl, seteventPhotoUrl] = useState(
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
	);
	const [eventOwnerId, seteventOwnerId] = useState("");
	const [groupId, setgroupId] = useState("");
	const [errors, setErrors] = useState([]);

    const locations =  useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});
    const groups =  useSelector((state) => {
		return Object.values(state.groupState.groupList).filter((group) => {
            return (group.userId === sessionUser.id);
        });
	});

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
		<div className="editEventCont">
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
                        defaultValue={eventName}
						value={eventName}
						onChange={(e) => setEventName(e.target.value)}
						required
					/>
				</label>
				<label>
					Location
					<select
                        id="locations"
                        defaultValue={locations[eventLocationId]}
						onChange={(e) => seteventLocationId(e.target.value.id)}
						required
					>
                        {locations.map((location, idx) => (
                            <option value={location[idx]}>{location.name}</option>
                        ))}
                    </select>
				</label>
				<label>
					Event Date
					<input
						type="date"
						className="editEventInput"
						value={eventDate}
						onChange={(e) => seteventDate(e.target.value)}
						required
					/>
				</label>
				<label>
					Event Time
					<input
						type="time"
						className="editEventInput"
						value={eventTime}
						onChange={(e) => seteventTime(e.target.value)}
						required
					/>
				</label>
				<label>
					Event Description
					<textarea
						className="editEventInput"
						value={eventDescription}
                        rows="10"
                        col="55"
						onChange={(e) => seteventDescription(e.target.value)}
						required
					/>
				</label>
				<label>
					Event Photo URL
					<input
						type="url"
						className="editEventInput"
						value={eventPhotoUrl}
						onChange={(e) => seteventPhotoUrl(e.target.value)}
					/>
				</label>
                if {groups}
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
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default EditEventPage;
