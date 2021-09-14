"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"Groups",
			[
				{
					groupName: "Boxing",
					description: "This group is for any boxing related events.",
				},
				{
					groupName: "MMA",
					description: "This group is for any MMA related events.",
				},
				{
					groupName: "Kung Fu",
					description:
						"This group is for any Kung Fu related events.",
				},
				{
					groupName: "Aikido",
					description: "This group is for any Aikida related events.",
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
		return queryInterface.bulkDelete("People", null, {});
	},
};
