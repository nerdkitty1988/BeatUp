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

module.exports = router;
