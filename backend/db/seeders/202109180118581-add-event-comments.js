"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"EventComments",
			[
				{
					userId: 1,
					eventId: 1,
					eventComment: "I am so excited to graduate!!",
				},
				{
					userId: 2,
					eventId: 1,
					eventComment: "I know!  I can not wait to get out there!",
				},
				{
					userId: 4,
					eventId: 1,
					eventComment: "It is a little scary though.",
				},
				{
					userId: 1,
					eventId: 1,
					eventComment:
						"Don't worry about it!  I know you have it all under control.",
				},
				{
					userId: 5,
					eventId: 9,
					eventComment: "Has anyone done this before?  Does it work?",
				},
				{
					userId: 3,
					eventId: 9,
					eventComment:
						"I do this with my crossfit group.  I have never been more fit in my life.",
				},
				{
					userId: 5,
					eventId: 9,
					eventComment: "Ok, I think I might try it out!",
				},
				{
					userId: 3,
					eventId: 9,
					eventComment:
						"Totally recommend it.  You could also look into trying out crossfit.",
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
		return queryInterface.bulkDelete("EventComments", null, {});
	},
};
