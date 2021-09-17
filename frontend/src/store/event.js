import { csrfFetch } from "./csrf";

const LOAD = "event/LOAD";
const ADD_ONE = "event/ADD_ONE";
const REMOVE_EVENT = "event/REMOVE_EVENT";

const load = (list) => ({
	type: LOAD,
	list,
});

const addOneEvent = (event) => ({
	type: ADD_ONE,
	event,
});

const remove = (eventId) => ({
	type: REMOVE_EVENT,
	eventId,
});

export const createEvent = (newEvent) => async (dispatch) => {
	const res = await csrfFetch("/api/events", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newEvent),
	});
	const event = await res.json();
    console.log(event)
	if (res.ok) {
		await dispatch(addOneEvent(event));
	}
    return event;
};

export const updateEvent = (newEvent) => async (dispatch) => {
	const res = await csrfFetch(`/api/events/${newEvent.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newEvent),
	});
	const event = await res.json();
	if (res.ok) {
		await dispatch(addOneEvent(event));
	}
    return event;
};

export const deleteEvent = (event) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${event.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    const eventId = await res.json();
    console.log(eventId)
    if (res.ok) {
        await dispatch(remove(eventId));
    }
    return eventId;

}

export const getEvents = () => async (dispatch) => {
	const res = await csrfFetch("/api/events");

	if (res.ok) {
		const list = await res.json();
		dispatch(load(list));
	}
};

const initialState = {
	eventList: {},
};

const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newEventList = { ...state.eventList };
			action.list.forEach((event) => {
				newEventList[event.id] = event;
			});

			return { ...state, eventList: { ...newEventList } };
		}
		case ADD_ONE: {

			const newEventList = {
				...state.eventList,
				[action.event.id]: action.event,
			};
            console.log(newEventList, "New List")

			return {
				...state,
				eventList: { ...newEventList },
			};
		};
		case REMOVE_EVENT: {
            let newState = {...state};
            delete newState.eventList[action.eventId];
            return newState;

		}
		default:
			return state;
	}
};

export default eventReducer;
