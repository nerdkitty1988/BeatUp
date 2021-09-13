import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<div className="signInBox">
			<div className="loginTop">
				<h1 className="loginHead">Log in</h1>
				<p>Not registered with us yet? <NavLink to='/signup' className='authLinks'>Sign Up</NavLink></p>
			</div>
			<div className="signinForm">
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className="signInFields">
						<label className="login-label">
							Username or Email
							<input
								className="signInInput"
								type="text"
								value={credential}
								onChange={(e) => setCredential(e.target.value)}
								required
							/>
						</label>
						<label className="login-label" htmlFor="password" />
							Password
							<input
								className="signInInput"
                                name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<NavLink to="/forgotPassword" className='authLinks'>
								Forgot your password?
							</NavLink>
						<button type="submit" className="loginButton">
							Log In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginFormPage;
