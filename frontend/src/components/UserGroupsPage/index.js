import { NavLink } from "react-router-dom";
import "./UserGroup.css";

const UserGroupsPage = ({ userGroups }) => {
    console.log(userGroups);
	if (!userGroups) {
		return (
			<div className="noGroupCont">
				<h1>You are not a member of any groups.</h1>
				<NavLink to="/groups" className="groupsButton">
					Explore Groups
				</NavLink>
			</div>
		);
	} else {
		return (
			<div className="groupCont">
				{userGroups.map((group) => {
					return (
						<NavLink className="groupDetails" to={`/groups/${group.id}`}>
							<h1 className="groupName">{group.groupName}</h1>
							<h2 className="groupDescription">{group.description}</h2>
						</NavLink>
					);
				})}
			</div>
		);
	}
};

export default UserGroupsPage;
