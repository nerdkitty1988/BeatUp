import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./GroupPage.css";

import { getGroups } from "../../store/group";

const GroupPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const groups = useSelector((state) => {
		return Object.values(state.groupState.groupList);
	});

	useEffect(() => {
		dispatch(getGroups());
	}, [dispatch]);

	if (!groups) return null;

	return (
		<div className="fullpage">
			<div className="eventListCont">
				<div className="addEventNav">
					<NavLink className="eventGroupNav" to={`/events`}>
						<button type="button" className="groupSelectButton">
							Events
						</button>
					</NavLink>
					<NavLink className="eventGroupNav" to={`/groups`}>
						<button type="button" className="groupEventButton">
							Groups
						</button>
					</NavLink>
					<NavLink className="addGroup" to={`/groups/add`}>
						<button type="button" className="addEventButton">
							Create Group
						</button>
					</NavLink>
				</div>
				<nav>
					{groups.map((group) => {
						return (
							<NavLink
								className="groupNavWhole"
								key={group.id}
								to={`groups/${group.id}`}
							>
								<div className="groupContainer">
									<h1>{group.groupName}</h1>
									<h2>{group.groupDescription}</h2>
									<h3>
										Group Members:{" "}
										{group.GroupMembers.length}
									</h3>
								</div>
							</NavLink>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default GroupPage;
