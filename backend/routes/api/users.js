const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username")
		.not()
		.isEmail()
		.withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a value for Password")
		.isLength({ max: 50 })
		.withMessage("Password must not be more than 50 characters long")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
		.withMessage(
			'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
		),
	check("confirmPassword")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a value for Confirm Password")
		.isLength({ max: 50 })
		.withMessage(
			"Confirm Password must not be more than 50 characters long"
		),
	handleValidationErrors,
];

router.post(
	"/",
	validateSignup,
	asyncHandler(async (req, res) => {
		const {
			email,
			password,
			username,
			firstName,
			lastName,
			zipcode,
			photoUrl,
		} = req.body;
		const user = await User.signup({
			email,
			username,
			password,
			firstName,
			lastName,
			zipcode,
			photoUrl,
		});

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

module.exports = router;
//MAht36cc-UzSiOYomWkf1Ro2FVI1FUPzR4lo
