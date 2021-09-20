import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../store/group";
import { useHistory } from "react-router";
import "./AddGroup.css"

function AddGroupForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [groupName, setGroupName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			groupName,
			description,
		};
		dispatch(createGroup(payload));
		history.push("/groups");
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="addGroupForm">
				<label>
					Group Name
					<input
                        className="addGroupInput"
						type="text"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						required
					/>
				</label>
				<label>
					Group Description
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				<button id="createGroupButton" type="submit">Create Group</button>
			</form>
		</div>
	);
}

export default AddGroupForm;
