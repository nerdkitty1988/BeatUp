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
                    eventId: 11,
                    rsvpStatus: "Attending"
				},
                {
					userId: 2,
                    eventId: 7,
                    rsvpStatus: "Not Attending"
				},
                {
					userId: 3,
                    eventId: 8,
                    rsvpStatus: "Attending"
				},
                {
					userId: 7,
                    eventId: 4,
                    rsvpStatus: "Attending"
				},
                {
					userId: 8,
                    eventId: 10,
                    rsvpStatus: "Attending"
				},
                {
					userId: 4,
                    eventId: 6,
                    rsvpStatus: "Attending"
				},
                {
					userId: 1,
                    eventId: 9,
                    rsvpStatus: "Attending"
				},
                {
					userId: 3,
                    eventId: 1,
                    rsvpStatus: "Attending"
				},
                {
					userId: 3,
                    eventId: 3,
                    rsvpStatus: "Attending"
				},
                {
					userId: 3,
                    eventId: 5,
                    rsvpStatus: "Attending"
				},
                {
					userId: 7,
                    eventId: 1,
                    rsvpStatus: "Attending"
				},
                {
					userId: 6,
                    eventId: 2,
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
