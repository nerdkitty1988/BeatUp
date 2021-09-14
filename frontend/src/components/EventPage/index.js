import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getEvents, updateEvent, createEvent } from '../../store/event';

const EventPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();

    const events = useSelector((state) => {
        return Object.values(state.eventState.eventList);
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
                        <NavLink key={event.name} to={`events/${event.id}`}>
                            <div className="eventImage" style={{backgroundImage: `url('${event.eventPhotoUrl}')`}} />
                            <div className='eventInfo'>
                                <h2>{event.eventName}</h2>
                                <div>
                                    <p>{event.eventLocation}</p>
                                    <p>{event.eventDate}</p>
                                    <p>{event.eventTime}</p>
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
