"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"GroupComments",
			[
				{
					userId: 4,
					groupId: 4,
                    groupComment: "Aikido is so great for self-defense."
				},
                {
					userId: 8,
					groupId: 4,
                    groupComment: "Sounds like you are in the right place then."
				},
                {
					userId: 3,
					groupId: 5,
                    groupComment: "Are there a lot of Las Vegas events?"
				},
                {
					userId: 2,
					groupId: 5,
                    groupComment: "Are you kidding?  They are happening all the time."
				},
                {
					userId: 1,
					groupId: 1,
                    groupComment: "Does this include kickboxing?"
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
		return queryInterface.bulkDelete("GroupComments", null, {});
	},
};
