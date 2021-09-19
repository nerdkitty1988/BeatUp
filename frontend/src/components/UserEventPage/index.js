import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./UserEvent.css";

import { getUserEvents } from "../../store/event";
import { getLocations } from "../../store/location";
import { getRsvps } from "../../store/rsvp";

const UserEventPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const events = useSelector((state) => {
		return Object.values(state.eventState.eventList);
	});
	const rsvps = useSelector((state) => {
		return Object.values(state.rsvpState.rsvpList);
	});
	const locations = useSelector((state) => {
		return Object.values(state.locationState.locationList);
	});

	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUserEvents(sessionUser));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRsvps());
	}, [dispatch]);

	if (!events) return null;

	return (
		<div className="fullpage">
			<div className="eventListCont">
				<div id="addEventNav">
					<NavLink className="eventGroupNav" to={`/events/add`}>
						<button className="eventSelectButton">Events</button>
					</NavLink>
                    <NavLink class="eventGroupNav" to={`/events/add`}>
                        <button className="eventGroupButton">Groups</button>
					</NavLink>
                    <NavLink id="addEvent" to={`/events/add`}>
                        <button id="addEventButton">Create Event</button>
					</NavLink>
				</div>
				<nav>
					{events.map((event) => {
						const readDate = new Date(
							event.eventDate
						).toDateString();
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
										<p key={event.eventDate}>{readDate}@{event.eventTime}</p>
										<h3>{event.eventName}</h3>
										<div>
											{locations.map((location) => {
												if (
													event.eventLocationId ===
													location.id
												)
													return (
														<p
															key={location.id}
															className="address"
														>
															{
																location.locationName
															}
															,{" "}
															{
																location.locationStreet
															}
															,{" "}
															{
																location.locationCity
															}
															,{" "}
															{
																location.locationState
															}
															,{" "}
															{
																location.locationZip
															}
														</p>
													);
											})}
											{rsvps.map((rsvp) => {
												if (
													rsvp.userId ===
														sessionUser.id &&
													rsvp.eventId === event.id
												)
													return (
														<p key={rsvp.id}>
															{rsvp.rsvpStatus}
														</p>
													);
											})}
										</div>
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

export default UserEventPage;
