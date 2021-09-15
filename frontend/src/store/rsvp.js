const LOAD = "rsvp/LOAD";
const UPDATE = "rsvp/UPDATE";
const ADD_ONE = "rsvp/ADD_ONE"

const addOneRsvp = (rsvp) => ({
    type: ADD_ONE,
    rsvp
})

const load = (list) => ({
    type: LOAD,
    list
});

const update = (rsvpId) => ({
    type: UPDATE,
    rsvpId,
});

export const createRsvp = (newRsvp) => async (dispatch) => {
    const res = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
		},
		body: JSON.stringify(newRsvp),
    });
    const rsvp = await res.json();
    if (res.ok) {
        dispatch(addOneRsvp(rsvp));
        return rsvp;
    }
};

export const updateRsvp = (newRsvp) => async (dispatch) => {
    const res = await fetch("/api/rsvps", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
		},
		body: JSON.stringify(newRsvp),
    });
    const rsvp = await res.json();
    if(res.ok) {
        dispatch(addOneRsvp(rsvp));
        return rsvp;
    }
};

export const getRsvps = () => async (dispatch) => {
    const res = await fetch("/api/rsvps");

    if (res.ok) {
        const list = await res.json();
        console.log(list)
        dispatch(load(list));
        return list;
    }
};

const initialState = {
    rsvpList: {},
};

const rsvpReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newRsvpList = { ...state.rsvpList };
            action.list.forEach((rsvp) => {
				newRsvpList[rsvp.id] = rsvp;
			});
            return {...state, rsvpList: newRsvpList};
        }
        case ADD_ONE: {
            if (!state[action.rsvp.id]) {
                const newState = {
                    ...state,
                    [action.rsvp.id]: action.rsvp,
                };
                const rsvpList = newState.list.map((id) => newState[id]);
                rsvpList.push(action.rsvp);
                return newState;
            }
            return {
                ...state,
                [action.rsvp.id]: {
                    ...state[action.rsvp.id],
                    ...action.rsvp,
                }
            }
        }
        default:
            return state;
    }
}

export default rsvpReducer;
