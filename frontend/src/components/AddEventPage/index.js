import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./EditEvent.css";


function EditEventPage() {
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
    const [eventName, setEventName] = useState("");
	const [eventLocationId, seteventLocationId] = useState("");
    const [eventDate, seteventDate] = useState("");
    const [eventTime, seteventTime] = useState("");
    const [eventDescription, seteventDescription] = useState("");
    const [eventPhotoUrl, seteventPhotoUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
	const [eventOwnerId, seteventOwnerId] = useState("");
	const [groupId, setgroupId] = useState("");
	const [errors, setErrors] = useState([]);


}
