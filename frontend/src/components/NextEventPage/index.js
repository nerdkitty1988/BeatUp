import { useDispatch, useSelector } from "react-redux";
import { getUserEvents } from "../../store/event";
import { getLocations } from "../../store/location";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const NextEventPage = ({sessionUser}) => {
    const dispatch = useDispatch();

    const events = useSelector((state) => {
		return Object.values(state.eventState.eventList);
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

    const nextEventFind = (events) => {
        let currentNext = events[0];
        events.forEach((event) => {
            if(event.eventDate < currentNext.eventDate) currentNext = event;
        });
        return currentNext;
    }
    const nextEvent = nextEventFind(events);
    const readDate = nextEvent ? (new Date(nextEvent.eventDate).toDateString()) : new Date();
    console.log(nextEvent);
    if (!events) return (
        <div className="noEventsCont">
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fimages%2Fevents&psig=AOvVaw3oTD82PR-jFjb8kEWhFZXU&ust=1632082097287000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDCpuWpifMCFQAAAAAdAAAAABAD" />
            <h3 className="notAttending">You are not attending any events right now.</h3>
            <h3 className="notAttending">Find one today.</h3>
            <NavLink to="/events" id="allEventsNav">Discover Events</NavLink>
        </div>
    );

    return (
        <div id="singleEventCont">
            <div className="singleEvent">
                <div className="singleEventPhotoCont">
                    <img id="singleEventPic" src={nextEvent.eventPhotoUrl}/>
                </div>
                <div className="singleEventInfoCont">
                    <p id="sEventDate">{readDate}</p>
                    <p id="sEventName">{nextEvent.eventName}</p>
                    <p id="sEventDescription">{nextEvent.eventDescription}</p>

                </div>
            </div>
        </div>
    )

}

export default NextEventPage;
