const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Event } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const events = await Event.findAll();
    return res.json(events);
}));

module.exports = router;
