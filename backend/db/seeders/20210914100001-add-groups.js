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
					groupName: "Taekwondo",
					description:
						"This group is for any Taekwondo related events.",
				},
				{
					groupName: "Aikido",
					description: "This group is for any Aikida related events.",
				},
				{
					groupName: "Las Vegas Fights",
					description:
						"This group is for those who are in or near Las Vegas, NV",
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
		return queryInterface.bulkDelete("Groups", null, {});
	},
};
