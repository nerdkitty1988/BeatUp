"use strict";
const faker = require("faker");
module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"Events",
			[
				{
					eventName: "Gradutation Party",
					eventLocationId: 1,
					eventDate: faker.date.future(),
					eventTime: '9:00 pm',
					eventDescription:
						"Party at the White House to celebrate WOW",
					eventPhotoUrl:
						"https://ymcafw.org/wp-content/uploads/ymca-fort-worth-events-birthday-parties.jpg",
					eventOwnerId: 1,
				},
				{
					eventName: "Boxing Brawl",
					eventLocationId: 2,
					eventDate: faker.date.future(),
					eventTime: '5:00 pm',
					eventDescription: "Fun times boxing and stuff",
					eventPhotoUrl:
						"https://cdn.shopify.com/s/files/1/1330/6287/products/OUTSHOCK_20GANTS_20DE_20BOXE_20100_20ROUGES_20_7C_20PSHOT_20_812x.progressive.jpg?v=1621419655",
					eventOwnerId: 2,
					groupId: 1,
				},
				{
					eventName: "MMA Match",
					eventLocationId: 8,
					eventDate: faker.date.future(),
					eventTime: '3:30 pm',
					eventDescription:
						"This match will have a 10 seed bracket.  Come try your luck!",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 3,
					groupId: 2,
				},
				{
					eventName: "Taekwondo Event",
					eventLocationId: 14,
					eventDate: faker.date.future(),
					eventTime: '5:00 pm',
					eventDescription:
						"Come practice your skills.  Not a judged event.",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 4,
					groupId: 3,
				},
				{
					eventName: "Backyard Battle",
					eventLocationId: 9,
					eventDate: faker.date.future(),
					eventTime: '12:00 pm',
					eventDescription: "Who is the toughest guy in Letterkenny?",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 5,
					groupId: 4,
				},
				{
					eventName: "WPE Wrestling",
					eventLocationId: 4,
					eventDate: faker.date.future(),
					eventTime: '4:30 pm',
					eventDescription:
						"Free for all fighting.  Always practice safe falls.",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 6,
					groupId: 5,
				},
				{
					eventName: "Kick It Up",
					eventLocationId: 11,
					eventDate: faker.date.future(),
					eventTime: '11:00 am',
					eventDescription:
						"All day kickboxing.  Come share or grow your skills!",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 7,
				},
				{
					eventName: "Toughguy Competition",
					eventLocationId: 6,
					eventDate: faker.date.future(),
					eventTime: '2:00 pm',
					eventDescription:
						"9 rounds of increasing difficulty.  Can you make it through?",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 8,
					groupId: 5,
				},
				{
					eventName: "Tire Rolling",
					eventLocationId: 8,
					eventDate: faker.date.future(),
					eventTime: '3:00 pm',
					eventDescription:
						"Work out by throwing around tractor tires.",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 1,
					groupId: 5,
				},
				{
					eventName: "Stair Climbing",
					eventLocationId: 1,
					eventDate: faker.date.future(),
					eventTime: '7:00 pm',
					eventDescription: "Work out by climbing stairs.",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 2,
				},
				{
					eventName: "Bumble Boxing",
					eventLocationId: 13,
					eventDate: faker.date.future(),
					eventTime: '7:00 pm',
					eventDescription:
						"Boxing for the newbies.  Come on down if you need to practice at your own pace.",
					eventPhotoUrl: faker.image.imageUrl(),
					eventOwnerId: 3,
					groupId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkDelete("Events", null, {});
	},
};
