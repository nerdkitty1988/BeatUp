const express = require("express");
const asyncHandler = require("express-async-handler");
const { Rsvp } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async function (req, res) {
		const rsvps = await Rsvp.findAll();
		return res.json(rsvps);
	})
);

module.exports = router;
