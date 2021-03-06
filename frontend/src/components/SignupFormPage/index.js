import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [photoUrl, setPhotoUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, firstName, lastName, zipcode, photoUrl, password })
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<div className="signUpContainer">
			<form className="signupForm" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
                        className="signupInput"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
                        className="signupInput"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
                <label>
					First Name
					<input
						type="text"
                        className="signupInput"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
                <label>
					Last Name
					<input
						type="text"
                        className="signupInput"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
                <label>
					Zip Code
					<input
						type="text"
                        className="signupInput"
						value={zipcode}
						onChange={(e) => setZipcode(e.target.value)}
						required
					/>
				</label>
                <label>
					Profile Photo URL
					<input
						type="url"
                        className="signupInput"
						value={photoUrl}
						onChange={(e) => setPhotoUrl(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
                        className="signupInput"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
                        className="signupInput"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button id="signupButton" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormPage;
