import { NavLink } from "react-router-dom";
import "./UserGroup.css";

const UserGroupsPage = ({ userGroups }) => {
	console.log(userGroups);
	if (!userGroups.length)
		{return (
			<div className="noGroupCont">
				<div className="noGroupInfo">
					<h1>You are not a member of any groups.</h1>
					<NavLink to="/groups">
						<button type="button" className="groupsButton" >Explore Groups</button>
					</NavLink>
				</div>
			</div>
		);}
	else {
		return (
			<div className="groupCont">
				{userGroups.map((group) => {
					return (
						<NavLink
							className="groupDetails"
							to={`/groups/${group.id}`}
						>
							<h1 className="groupName">{group.groupName}</h1>
							<h2 className="groupDescription">
								{group.description}
							</h2>
						</NavLink>
					);
				})}
			</div>
		);
	}
};

export default UserGroupsPage;
