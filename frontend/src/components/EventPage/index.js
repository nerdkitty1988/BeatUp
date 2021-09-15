import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';


import { getEvents, updateEvent, createEvent } from '../../store/event';

const EventPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);


    const events = useSelector((state) => {
        return Object.values(state.eventState.eventList);
    });
    const rsvps = useSelector((state) => {
        return Object.values(state.eventState.rsvpStatus);
    });



    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch]);

    if(!events) return null;

    return (
        <div className="eventListCont">
            <nav>
                {events.map((event) => {
                    return (
                        <NavLink key={event.eventName} to={`events/${event.id}`}>
                            <div className="eventContainer">
                                <img id="eventPhoto" src={event.eventPhotoUrl} alt="event photo" />
                                <div className='eventInfo'>
                                    <h2>{event.eventName}</h2>
                                    <div>
                                        <p>{event.eventLocationId}</p>
                                        <p>{event.eventDate}</p>
                                        <p>{event.eventTime}</p>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
        </div>
    )
}


export default EventPage;
