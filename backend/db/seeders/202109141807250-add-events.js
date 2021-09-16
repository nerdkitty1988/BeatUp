"use strict";

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
					eventDate: new Date(),
					eventTime: "07:00 pm",
					eventDescription:
						"Party at the White House to celebrate WOW",
					eventPhotoUrl:
						"https://ymcafw.org/wp-content/uploads/ymca-fort-worth-events-birthday-parties.jpg",
					eventOwnerId: 1,
					groupId: 3,
				},
				{
					eventName: "Boxing Brawl",
					eventLocationId: 2,
					eventDate: new Date(),
					eventTime: "09:00 pm",
					eventDescription: "Fun times boxing and stuff",
					eventPhotoUrl:
						"https://cdn.shopify.com/s/files/1/1330/6287/products/OUTSHOCK_20GANTS_20DE_20BOXE_20100_20ROUGES_20_7C_20PSHOT_20_812x.progressive.jpg?v=1621419655",
					eventOwnerId: 2,
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
