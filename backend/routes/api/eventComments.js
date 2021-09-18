const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event, Rsvp, sequelize } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const comments = await EventComment.findAll();
		return res.json(comments);
	})
);


module.exports = router;
