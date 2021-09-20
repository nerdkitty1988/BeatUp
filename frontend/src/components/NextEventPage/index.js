import { NavLink } from "react-router-dom";
import "./NextEventPage.css";

const NextEventPage = ({nextEvent}) => {

    let location;

    if(nextEvent) {
        location = nextEvent.Location;
    };

	const readDate = nextEvent
		? new Date(nextEvent.eventDate).toDateString()
		: new Date();
	if (!nextEvent || !location)
		return (
			<div className="singleNoEventCont">
				<div className="singleEvent">
					<div className="singleEventPhotoCont">
						<img
							className="singleEventPic"
							src="https://handsontek.net/images/Lists/Default%20Calendar/hero.png"
						/>
					</div>
					<div className="noEventInfoCont">
						<h4 className="notAttending">
							You are not attending any events right now.  Find one today.</h4>
					</div>

					<NavLink to="/events" id="allEventsNav">
						<button id="discoverButton">Discover Events</button>
					</NavLink>
				</div>
			</div>
		);

	return (
		<div className="singleEventCont">
			<NavLink id="nextEventNav" to={`/events/${nextEvent.id}`}>
				<div className="singleEvent">
					<div className="singleEventPhotoCont">
						<img
							className="singleEventPic"
							src={nextEvent.eventPhotoUrl}
						/>
					</div>
					<div className="singleEventInfoCont">
						<p id="sEventDate">
							{readDate}@{nextEvent.eventTime}
						</p>
						<p id="sEventName">{nextEvent.eventName}</p>
						<p id="sEventDescription">
							{nextEvent.eventDescription}
						</p>
						<p id="sEventLocation">
							{location.locationCity}, {location.locationState}
						</p>
					</div>
				</div>
			</NavLink>
		</div>
	);
};

export default NextEventPage;
