const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Event, EventParticipant } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const events = await Event.findAll();
    const rsvpStatus = await EventParticipant.findAll();
    const eventWithRsvp = [events, rsvpStatus]
    return (
        res.json(eventWithRsvp))
}));

module.exports = router;
