"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			eventName: {
				type: Sequelize.STRING(150),
				allowNull: false,
			},
			eventLocationId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Locations" },
			},
			eventDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			eventTime: {
				allowNull: false,
				type: Sequelize.STRING,
			},
            eventDescription: {
                type: Sequelize.STRING,
				allowNull: false,
            },
			eventPhotoUrl: {
				type: Sequelize.STRING(256),
			},
			eventOwnerId: {
                allowNull: false,
				type: Sequelize.INTEGER,
                references: { model: 'Users' }
			},
			groupId: {
				type: Sequelize.INTEGER,
                references: { model: 'Groups' }
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Events");
	},
};
