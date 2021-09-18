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
					locationName: "THE ARENA",
					locationStreet: "3350 Sports Arena Blvd",
					locationCity: "San Diego",
					locationState: "CA",
					locationZip: "92110",
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
					locationName: "T-Mobile Arena",
					locationStreet: "3780 Las Vegas Blvd S",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89158",
				},
				{
					locationName: "Pearl Theater",
					locationStreet: "4321 W Flamingo Rd",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89103",
				},
				{
					locationName: "Mandalay Bay Events Center",
					locationStreet: "3950 Las Vegas Blvd S",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89109",
				},
				{
					locationName: "UFC Apex",
					locationStreet: "6650 El Camino Rd",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89118",
				},
				{
					locationName: "MGM Grand Garden Arena",
					locationStreet: "3799 S Las Vegas Blvd",
					locationCity: "Las Vegas",
					locationState: "NV",
					locationZip: "89109",
				},
				{
					locationName: "Nationwide Arena",
					locationStreet: "200 W Nationwide Blvd",
					locationCity: "Columbus",
					locationState: "OH",
					locationZip: "43215",
				},
				{
					locationName: "Staples Center",
					locationStreet: "1111 S Figueroa St",
					locationCity: "Los Angeles",
					locationState: "CA",
					locationZip: "90015",
				},
				{
					locationName: "TD Garden",
					locationStreet: "100 Legends Way",
					locationCity: "Boston",
					locationState: "MA",
					locationZip: "02114",
				},
				{
					locationName: "Royal Farms Arena",
					locationStreet: "201 W Baltimore St",
					locationCity: "Baltimore",
					locationState: "MD",
					locationZip: "21201",
				},
				{
					locationName: "Smoothie King Center",
					locationStreet: "1501 Dave Dixon Dr",
					locationCity: "New Orleans",
					locationState: "LA",
					locationZip: "70113",
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
