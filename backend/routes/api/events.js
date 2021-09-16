const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async function (req, res) {
		const events = await Event.findAll();
		return res.json(events);
	})
);

router.get(
	"/:eventId",
	asyncHandler(async function (req, res) {
		const event = await Event.findOne(req.params.id);

		return res.json(event);
	})
);

router.post(
	"/:eventId",
	asyncHandler(async (req, res) => {
		const {
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
			eventOwnerId,
			groupId,
		} = req.body;
		const event = await Event.updateEvent({
            eventName,
            eventLocationId,
            eventDate,
            eventTime,
            eventDescription,
            eventPhotoUrl,
            eventOwnerId,
            groupId,
		});

		return res.json({
			event,
		});
	})
);

module.exports = router;
