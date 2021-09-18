"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"EventLikes",
			[
				{
					userId: 1,
					eventId: 11,
				},
				{
					userId: 1,
					eventId: 10,
				},
				{
					userId: 1,
					eventId: 9,
				},
				{
					userId: 2,
					eventId: 11,
				},
				{
					userId: 2,
					eventId: 9,
				},
				{
					userId: 3,
					eventId: 7,
				},
				{
					userId: 7,
					eventId: 7,
				},
				{
					userId: 8,
					eventId: 1,
				},
				{
					userId: 8,
					eventId: 2,
				},
				{
					userId: 8,
					eventId: 11,
				},
				{
					userId: 8,
					eventId: 10,
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
		return queryInterface.bulkDelete("EventLikes", null, {});
	},
};
