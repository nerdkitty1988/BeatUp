const LOAD = 'event/LOAD';
const ADD_ONE = 'event/ADD_ONE';
const REMOVE_EVENT = 'event/REMOVE_EVENT';

const load = list => ({
    type: LOAD,
    list
});

const addOneEvent = event => ({
    type: ADD_ONE,
    event
});

const remove = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
});


export const createEvent = (newEvent) => async (dispatch) => {
    const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newEvent)
    });
    const event = await res.json();
    if(res.ok) {
        dispatch(addOneEvent(event));
        return event;
    }
}

export const updateEvent = (newEvent) => async (dispatch) => {
    const res = await fetch('/api/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEvent)
    });
    const event = await res.json();
    if(res.ok) {
        dispatch(addOneEvent(event));
        return event;
    }
}

export const getEvents = () => async (dispatch) => {
    const res = await fetch('/api/events');

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
}

const initialState = {
    eventList: {}
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newEventList = { ...state.eventList };
            action.list.forEach((event) => {
                newEventList[event.id] = event;
            });
            return {...state, eventList: {...newEventList}};
        }
        case ADD_ONE: {
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id]: action.event
                };
                const eventList = newState.list.map(id => newState[id]);
                eventList.push(action.event);
                return newState;
            }
            return {
                ...state,
                [action.event.id]: {
                    ...state[action.event.id],
                    ...action.event,
                }
            };
        }
        case REMOVE_EVENT: {
            return {
                ...state,
                list: state[action.eventId].list.filter(
                    (event) => event.id !== action.eventId
                ),
            }

        }
        default: return state;
    }
}

export default eventReducer;
