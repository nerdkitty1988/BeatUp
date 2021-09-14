"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.io",
					username: "Demo-lition",
					firstName: "Joe",
					lastName: "Schmoe",
					photoUrl:
						"https://www.realityblurred.com/realitytv/images/2018/09/joe-schmo-show-matt-kennedy-gould-768x480.jpg.webp",
					zipcode: 77485,
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: faker.internet.email(),
					username: "FakeUser1",
					firstName: "Bob",
					lastName: "Saget",
					photoUrl:
						"https://pyxis.nymag.com/v1/imgs/79e/db8/9c301c8b5793dd114bfba00ea71642aeee-bob-saget-849135726.rhorizontal.w700.jpg",
					zipcode: 40475,
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "FakeUser2",
					firstName: "Tina",
					lastName: "Turner",
					photoUrl:
						"https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwNTMwNjYzNjg0ODQyODU2/tina-turner.jpg",
					zipcode: 90210,
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"],
				},
			},
			{}
		);
	},
};
