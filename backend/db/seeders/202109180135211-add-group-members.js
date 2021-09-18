"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"GroupMembers",
			[
				{
                    userId: 1,
                    groupId: 1
				},
                {
                    userId: 1,
                    groupId: 3
				},
                {
                    userId: 1,
                    groupId: 5
				},
                {
                    userId: 4,
                    groupId: 4
				},
                {
                    userId: 8,
                    groupId: 4
				},
                {
                    userId: 3,
                    groupId: 5
				},
                {
                    userId: 2,
                    groupId: 5
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
		return queryInterface.bulkDelete("GroupMembers", null, {});
	},
};
