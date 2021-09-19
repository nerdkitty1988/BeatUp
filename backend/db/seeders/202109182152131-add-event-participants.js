"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"EventParticipants",
			[
				{
					userId: 1,
					eventId: 1,
				},
				{
					userId: 1,
					eventId: 9,
				},
				{
					userId: 1,
					eventId: 7,
				},
				{
					userId: 1,
					eventId: 4,
				},
				{
					userId: 1,
					eventId: 11,
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
		return queryInterface.bulkDelete("EventParticipants", null, {});
	},
};
