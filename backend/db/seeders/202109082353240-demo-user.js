"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "email@email.com",
					username: "Demo-lition",
					firstName: "Joe",
					lastName: "Schmoe",
					photoUrl:
						"https://www.realityblurred.com/realitytv/images/2018/09/joe-schmo-show-matt-kennedy-gould-768x480.jpg.webp",
					zipcode: "89103",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: faker.internet.email(),
					username: "Bobberton",
					firstName: "Bob",
					lastName: "Saget",
					photoUrl:
						"https://pyxis.nymag.com/v1/imgs/79e/db8/9c301c8b5793dd114bfba00ea71642aeee-bob-saget-849135726.rhorizontal.w700.jpg",
					zipcode: "92110",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "SongLuvr",
					firstName: "Tina",
					lastName: "Turner",
					photoUrl:
						"https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwNTMwNjYzNjg0ODQyODU2/tina-turner.jpg",
					zipcode: "20500",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "Undertaker",
					firstName: "Mark",
					lastName: "Calaway",
					photoUrl:
						"https://pbs.twimg.com/profile_images/1070084370696794112/ecpXIUeY.jpg",
					zipcode: "89109",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "GalvestonGiant",
					firstName: "Jack",
					lastName: "Johnson",
					photoUrl:
						"https://www.masonrytoday.com/search/summaries/images/sum266.jpg",
					zipcode: "89109",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "KLFgurl",
					firstName: "Zhang",
					lastName: "Weili",
					photoUrl:
						"https://www.mmafacts.com/wp-content/uploads/2021/03/weili_zhang.png",
					zipcode: "90015",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "Asuka",
					firstName: "Kanako",
					lastName: "Urai",
					photoUrl:
						"https://static.tvtropes.org/pmwiki/pub/images/asuka_face.jpg",
					zipcode: "43215",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "ChuckYeah",
					firstName: "Carlos",
					lastName: "Ray",
					photoUrl:
						"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGuXgBrvKe880TYSUoqPhL6MUGyl6iy-_Qjzg7W-peh073XHs4",
					zipcode: "21201",
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
