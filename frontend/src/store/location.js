const LOAD = 'locations/LOAD';
const ADD_ONE = 'locations/ADD_ONE';

const load = list => ({
    type: LOAD,
    list,
});

const addOneLocation = location => ({
    type: ADD_ONE,
    location,
});

export const createLocation = (newLocation) => async (dispatch) => {
    const res = await fetch('/api/locations', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newLocation)
    });
    const location = await res.json();
    if (res.ok) {
        dispatch(addOneLocation(location));
        return location;
    }
}

export const updateLocation = (newLocation) => async (dispatch) => {
    const res = await fetch(`/api/locations/${newLocation.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newLocation)
    });
    const location = await res.json();
    if (res.ok) {
        dispatch(addOneLocation(location));
        return location;
    }
}

export const getLocations = () => async (dispatch) => {
    const res = await fetch('/api/locations');

    if(res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
}

const initialState = {
    list: []
}

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allLocations = {};
            action.list.forEach(location => {
                allLocations[location.id] = location;
            });
            return {
                ...allLocations,
                ...state,
                list: action.list,
            };
        }
        case ADD_ONE: {
            if(!state[action.location.id]) {
                const newState = {
                    ...state,
                    [action.location.id]: action.location
                };
                const locationList = newState.list.map(id => newState[id]);
                locationList.push(action.location);
                newState.list = locationList;
                return newState;
            }
            return {
                        ...state,
                        [action.location.id]: {
                            ...state[action.location.id],
                            ...action.location
                        },
            };
        };
        default:
            return state;
    }
}

export default locationReducer;
