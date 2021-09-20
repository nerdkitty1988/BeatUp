import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./SingleGroupPage.css";

import { getGroups, updateMember } from "../../store/group";
import { getLocations } from "../../store/location";
import { createRsvp } from "../../store/rsvp";
import { getGroupEvents } from "../../store/event";

const SingleGroupPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const { groupId } = useParams();
	let history = useHistory();

	const group = useSelector((state) => state.groupState.groupList[groupId]);
	const events = useSelector((state) => {
		return Object.values(state.eventState.eventList);
	});
    console.log(events);

	useEffect(() => {
		dispatch(getGroups());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getGroupEvents(groupId));
	}, [dispatch]);

	const handleAddToGroup = async (e) => {
		e.preventDefault();
		const payload = {
			userId: sessionUser.id,
			groupId,
		};
		let updatedMember = await dispatch(updateMember(payload));
	};

	let isMember = false;

	if (group) {
		let groupMembers = [...group.GroupMembers];
		groupMembers.forEach((member) => {
			if (member.userId === sessionUser.id) {
				isMember = true;
			}
		});
	}

	if (!group) return null;

	return (
		<div className="wholeGroup">
			<div className="groupDetails">
				<h1>{group.groupName}</h1>
				<h2>{group.description}</h2>
				<h3>
					{isMember ? (
						"You are a member of this group"
					) : (
						<button onClick={(e) => handleAddToGroup}>
							Join Group
						</button>
					)}
				</h3>
			</div>
			<div id="groupEvents">
				{events.map((event) => (
					<NavLink
						key={event.id}
						className="groupEventNav"
						to={`/events/${event.id}`}
					>
						<div className="eventBox">
							<img
								className="eventBoxPhoto"
								src={event.eventPhotoUrl}
							/>
							<h1 id="groupEventName">{event.eventName}</h1>
							<h3 id="groupEventLocation">
								{event.Location.locationCity},{" "}
								{event.Location.locationState}
							</h3>
						</div>
					</NavLink>
                ))}
			</div>
		</div>
	);
};

export default SingleGroupPage;
