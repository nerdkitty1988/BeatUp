import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import "./HomePage.css";

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if(!sessionUser) {

        return (
            <div id="homeContainer">
                <div>
                    <h1>Wanna rumble?</h1>
                    <NavLink to="/signup">Sign up</NavLink>
                </div>
            </div>
        )
    }else{
        return (
            <div id="homeContainer">
                <div>
                    <h1>Welcome {sessionUser.username}</h1>
                    <h2>Find new </h2>
                    <NavLink to="/events">Events</NavLink>
                </div>
            </div>
        )
    }
}

export default HomePage;
