const express = require("express");
const asyncHandler = require("express-async-handler");
const {
	User,
	Group,
	GroupMember,
	GroupComment,
	Event,
} = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async function (req, res) {
		const groups = await Group.findAll({
			include: [
				{
					model: GroupMember,
				},
				{
					model: GroupComment,
				},
			],
		});
		return res.json(groups);
	})
);

router.post(
	"/",
	asyncHandler(async function (req, res) {
		const { groupName, description } = req.body;
		const details = {
			groupName,
			description,
		};
		const group = await Group.create(details);
	})
);

router.get(
	"/:groupId(\\d+)",
	asyncHandler(async function (req, res) {
		const group = await Group.findByPk(req.params.groupId);

		return res.json(group);
	})
);

router.get(
	"/user/:userId(\\d+)",
	asyncHandler(async function (req, res) {
		const userId = req.params.userId;
		const groups = await Group.findAll({
			include: [
				{
					model: GroupComment,
				},
				{
					model: GroupMember,
					where: {
						userId,
					},
				},
			],
		});
		return res.json(groups);
	})
);
router.get(
	"/addMember",
	asyncHandler(async function (req, res) {
		const { userId, groupId } = req.body;
		const details = { userId, groupId };
        const newMember = await GroupMember.create(details);
        const updatedGroups = await Group.findAll({
			include: [
				{
					model: GroupMember,
				},
				{
					model: GroupComment,
				},
			],
		});
		return res.json(updatedGroups);
	})
);

module.exports = router;
