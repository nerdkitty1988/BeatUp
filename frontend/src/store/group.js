import { csrfFetch } from "./csrf";

const LOAD = "group/LOAD";
const ADD_ONE = "group/ADD_ONE";
const REMOVE_GROUP = "group/REMOVE_group";

const load = (list) => ({
	type: LOAD,
	list,
});

const addOneGroup = (group) => ({
	type: ADD_ONE,
	group,
});

const remove = (groupId) => ({
	type: REMOVE_GROUP,
	groupId,
});

export const createGroup = (newGroup) => async (dispatch) => {
	const res = await csrfFetch(`/api/groups`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newGroup),
	});
	const group = await res.json();
	if (res.ok) {
		await dispatch(addOneGroup(group));
	}
	return group;
};

export const getGroups = () => async (dispatch) => {
	const res = await csrfFetch("/api/groups");

	if (res.ok) {
		const list = await res.json();
		dispatch(load(list));
	}
};

export const getUserGroups = (user) => async (dispatch) => {
	const res = await csrfFetch(`/api/groups/user/${user.id}`);

	if (res.ok) {
		const list = await res.json();
		dispatch(load(list));
	}
};

const initialState = {
	groupList: {},
};

const groupReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newGroupList = { ...state.groupList };
			action.list.forEach((group) => {
				newGroupList[group.id] = group;
			});
			return { ...state, groupList: { ...newGroupList } };
		};
        case ADD_ONE: {
            const newGroupList = {
                ...state.groupList,
                [action.group.id]: action.group,
            };
            return {
                ...state,
                groupList: {...newGroupList},
            };
        };
        default:
            return state;
	}
};

export default groupReducer;
