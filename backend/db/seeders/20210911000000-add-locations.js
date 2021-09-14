"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"Locations",
			[
				{
					locationName: "The White House",
					locationStreet: "1600 Pennsylvania Avenue NW",
					locationCity: "Washington",
					locationState: "DC",
					locationZip: "20500",
				},
				{
					locationName: "The White House",
					locationStreet: "1600 Pennsylvania Avenue NW",
					locationCity: "Washington",
					locationState: "DC",
					locationZip: "20500",
				},
				{
					locationName: "Madison Square Garden",
					locationStreet: "4 Pennsylvania Plaza",
					locationCity: "New York",
					locationState: "NY",
					locationZip: "10001",
				},
				{
					locationName: "The Colosseum at Caesars Palace",
					locationStreet: "3570 S Las Vegas Blvd",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89109",
				},
				{
					locationName: "Boardwalk Hall",
					locationStreet: "2301 Boardwalk",
					locationCity: "Atlantic City",
					locationState: "NJ",
					locationZip: "08401",
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
		return queryInterface.bulkDelete("Locations", null, {});
	},
};
