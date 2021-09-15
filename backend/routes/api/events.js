const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event, Rsvp } = require("../../db/models");


const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const events = await Event.findAll();
    const rsvpStatus = await Rsvp.findAll()
    const eventWithRsvp = [events, rsvpStatus]
    return (
        res.json(eventWithRsvp))
}));

router.get('/:eventId', asyncHandler(async function (req, res) {
    const event = await Event.findOne(req.params.id);
    const rsvpStatus = await Rsvp.findAll({
        where: {
            userId: user.id
        }
    });
    const eventWithRsvp = [event, rsvpStatus]
    return res.json(eventWithRsvp);
}))

module.exports = router;
