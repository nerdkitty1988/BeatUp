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

router.put(
	"/:eventId",
	asyncHandler(async (req, res) => {
		const {
            id,
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
			eventOwnerId,
			groupId,
		} = req.body;
        const details = {
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
			eventOwnerId,
			groupId}
		const event = await Event.update(

            details,
            {
                where: {id},
                returning: true,
                plain: true,
            }
		);

		return res.json({
			event,
		});
	})
);

module.exports = router;
