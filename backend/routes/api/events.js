const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event, Rsvp, sequelize } = require("../../db/models");

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
			id,
			eventName,
			eventLocationId,
			eventDate,
			eventTime,
			eventDescription,
			eventPhotoUrl,
			eventOwnerId,
			groupId,
		};
		const event = await Event.findByPk(id);

		const newEvent = await event.update(details);
		console.log(newEvent, "New Event");

		return res.json(newEvent);
	})
);

router.post("/", asyncHandler(async function (req, res) {
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

    const details = {
        eventName,
        eventLocationId,
        eventDate,
        eventTime,
        eventDescription,
        eventPhotoUrl,
        eventOwnerId,
        groupId,
    };
    const event = await Event.create(details);

}))

router.delete(
	"/:id",
	asyncHandler(async function (req, res) {
		const { id } = req.body;
        console.log(id)
		const event = await Event.findByPk(id);
        console.log(event)
		// if (!event) throw new Error("Cannot find event");
        // await EventComments.destroy({ where: { eventId: id } });
        // await EventLikes.destroy({ where: { eventId: id } });
        // await EventParticipants.destroy({ where: { eventId: id } });
		await event.destroy();
        return res.json( id )
	})
);

module.exports = router;
