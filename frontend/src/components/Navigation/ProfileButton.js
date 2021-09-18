import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
			<div className="profileButtonDiv">
                <img src={user.photoUrl} id="navProfilePic" alt="avatar" onClick={openMenu}/>
				{showMenu && (
                    <div id="profileNav">

					    <ul className="profile-dropdown">
                            <li>{`${user.firstName} ${user.lastName}`}</li>
						    <li>{user.username}</li>
						    <li>{user.email}</li>
						    <li>
							    <button onClick={logout}>Log Out</button>
						    </li>
					    </ul>
                    </div>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
