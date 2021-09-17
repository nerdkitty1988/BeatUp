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
	if (res.ok) {
		dispatch(addOneEvent(event));
		return event;
	}
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
		dispatch(addOneEvent(event));
	}
    return event;
};

export const deleteEvent = (event) => async (dispatch) => {
    dispatch(remove(event));

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
            console.log (action.event, "Event ID")
            console.log(state.eventList, "Event List")
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
            const current = {...state}
            delete current.eventList[action.event.id];
            return current;
		}
		default:
			return state;
	}
};

export default eventReducer;
