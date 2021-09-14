"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"Rsvps",
			[
				{
					userId: 1,
                    eventId: 2,
                    rsvpStatus: "Maybe"
				},
                {
					userId: 1,
                    eventId: 1,
                    rsvpStatus: "Attending"
				},
                {
					userId: 2,
                    eventId: 1,
                    rsvpStatus: "Not Attending"
				},
                {
					userId: 3,
                    eventId: 1,
                    rsvpStatus: "Attending"
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
		return queryInterface.bulkDelete("Rsvps", null, {});
	},
};
