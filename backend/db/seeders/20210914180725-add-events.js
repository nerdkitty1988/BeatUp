"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			"Events",
			[
				{
					eventName: "Gradutaion Party",
					eventLocation: 1,
                    eventDate: new Date(),
                    eventTime: '07:00 pm',
                    eventPhotoUrl: 'https://ymcafw.org/wp-content/uploads/ymca-fort-worth-events-birthday-parties.jpg',
                    eventOwnerId: 1,
                    groupId: 1
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
      return queryInterface.bulkDelete('People', null, {});
    */
	},
};
